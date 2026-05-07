import { createClient } from "@supabase/supabase-js";

// Supabase table required:
//   CREATE TABLE phone_otps (
//     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     phone text NOT NULL,
//     code text NOT NULL,
//     expires_at timestamptz NOT NULL,
//     used boolean DEFAULT false,
//     attempts int DEFAULT 0,
//     created_at timestamptz DEFAULT now()
//   );
//   CREATE INDEX ON phone_otps (phone, expires_at);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function isValidE164(phone) {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

async function sendViaCLickSend(phone, code) {
  const credentials = Buffer.from(
    `${process.env.CLICKSEND_USERNAME}:${process.env.CLICKSEND_API_KEY}`
  ).toString("base64");

  const res = await fetch("https://rest.clicksend.com/v3/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      messages: [
        {
          to: phone,
          body: `Your ReviewChaser code is ${code}. Valid for 10 minutes. Do not share this code.`,
          from: "ReviewChaser",
        },
      ],
    }),
  });

  const json = await res.json();
  if (!res.ok || json.http_code !== 200) {
    throw new Error(json.response_msg || "SMS delivery failed");
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { phone } = req.body;
  if (!phone || !isValidE164(phone)) {
    return res.status(400).json({ error: "Invalid phone number format." });
  }

  try {
    // Rate limit: max 5 OTPs per phone per hour
    const oneHourAgo = new Date(Date.now() - 3_600_000).toISOString();
    const { count, error: countErr } = await supabase
      .from("phone_otps")
      .select("*", { count: "exact", head: true })
      .eq("phone", phone)
      .gt("created_at", oneHourAgo);

    if (countErr) throw new Error(`DB count error: ${countErr.message}`);

    if (count >= 5) {
      return res.status(429).json({ error: "Too many codes sent. Please wait before requesting another." });
    }

    // Invalidate any existing unused OTPs for this phone
    await supabase.from("phone_otps").update({ used: true }).eq("phone", phone).eq("used", false);

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: insertErr } = await supabase
      .from("phone_otps")
      .insert({ phone, code, expires_at: expiresAt });

    if (insertErr) throw new Error(`DB insert error: ${insertErr.message}`);

    await sendViaCLickSend(phone, code);

    return res.json({ sent: true });
  } catch (e) {
    console.error("send-phone-otp error:", e.message);
    return res.status(500).json({ error: e.message || "Failed to send code. Please try again." });
  }
}
