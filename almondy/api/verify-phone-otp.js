import { createClient } from "@supabase/supabase-js";

// Also requires on rc_profiles:
//   ALTER TABLE rc_profiles ADD COLUMN IF NOT EXISTS phone text;
//   ALTER TABLE rc_profiles ADD COLUMN IF NOT EXISTS billing_email text;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Deterministic fake email for phone-based Supabase auth users.
// Never shown to the user — only used internally as a unique Supabase identity.
function phoneToEmail(phone) {
  return `${phone.replace("+", "").replace(/\s/g, "")}@sms.almondy.com`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: "Missing fields." });

  // Look up the most recent valid OTP for this phone
  const { data: otp } = await supabase
    .from("phone_otps")
    .select("*")
    .eq("phone", phone)
    .eq("used", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!otp) {
    return res.status(400).json({ error: "Code expired or not found. Request a new code.", code: "expired" });
  }

  // Already at 3 attempts — lock it
  if (otp.attempts >= 3) {
    await supabase.from("phone_otps").update({ used: true }).eq("id", otp.id);
    return res.status(400).json({ error: "Too many incorrect attempts. Request a new code.", code: "too_many_attempts" });
  }

  // Wrong code
  if (String(otp.code) !== String(code)) {
    const newAttempts = otp.attempts + 1;
    const updates = { attempts: newAttempts };
    if (newAttempts >= 3) updates.used = true;
    await supabase.from("phone_otps").update(updates).eq("id", otp.id);
    return res.status(400).json({
      error: newAttempts >= 3
        ? "Too many incorrect attempts. Request a new code."
        : `Incorrect code. ${3 - newAttempts} attempt${3 - newAttempts !== 1 ? "s" : ""} remaining.`,
      code: newAttempts >= 3 ? "too_many_attempts" : "wrong_code",
      attemptsLeft: Math.max(0, 3 - newAttempts),
    });
  }

  // ✓ Code correct — mark used
  await supabase.from("phone_otps").update({ used: true }).eq("id", otp.id);

  const fakeEmail = phoneToEmail(phone);

  // Check if user already exists (via rc_profiles for reliability)
  const { data: existingProfile } = await supabase
    .from("rc_profiles")
    .select("id")
    .eq("email", fakeEmail)
    .maybeSingle();

  const isNewUser = !existingProfile;

  if (isNewUser) {
    // Create Supabase auth user
    const { error: createError } = await supabase.auth.admin.createUser({
      email: fakeEmail,
      email_confirm: true,
      user_metadata: { phone },
    });
    if (createError && !createError.message?.includes("already")) {
      console.error("createUser error:", createError);
      return res.status(500).json({ error: "Failed to create account. Please try again." });
    }
  }

  // Generate a magic-link token so the client can establish a Supabase session
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: fakeEmail,
  });

  if (linkError || !linkData?.properties?.action_link) {
    console.error("generateLink error:", linkError);
    return res.status(500).json({ error: "Failed to create session. Please try again." });
  }

  const actionLink = linkData.properties.action_link;
  const tokenHash = new URL(actionLink).searchParams.get("token");

  return res.json({ tokenHash, type: "magiclink", isNewUser, phone });
}
