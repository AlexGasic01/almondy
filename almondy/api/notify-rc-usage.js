import { createClient } from "@supabase/supabase-js";

// Requires RESEND_API_KEY env var for email delivery.
// Requires usage_notified jsonb column on rc_profiles:
//   ALTER TABLE rc_profiles ADD COLUMN IF NOT EXISTS usage_notified jsonb DEFAULT '{}'::jsonb;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const VALID_THRESHOLDS = [30, 50, 90, 100];

function subject(threshold) {
  if (threshold === 100) return "You've hit your monthly send limit — upgrade to keep going";
  return `You've used ${threshold}% of your monthly sends`;
}

function emailHtml(threshold, bizName, upgradeUrl) {
  const name = bizName || "there";
  let body, cta = "";

  if (threshold === 100) {
    body = "You've hit your monthly limit. Upgrade to keep sending review requests and never miss a job.";
    cta = `<a href="${upgradeUrl}" style="display:inline-block;margin-top:20px;background:#22c55e;color:#000;padding:13px 26px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Upgrade Now — Don't Miss Out</a>`;
  } else if (threshold === 90) {
    body = "You've used 90% of your monthly sends. Consider upgrading before you run out.";
    cta = `<a href="${upgradeUrl}" style="display:inline-block;margin-top:20px;background:#22c55e;color:#000;padding:13px 26px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Upgrade Plan</a>`;
  } else {
    body = `You've used ${threshold}% of your monthly sends.`;
  }

  return `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#080808;margin:0;padding:40px 16px;">
  <div style="max-width:520px;margin:0 auto;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 32px;">
    <div style="font-size:20px;font-weight:800;letter-spacing:-0.5px;color:#fff;margin-bottom:28px;">ReviewChaser</div>
    <p style="font-size:15px;line-height:1.7;color:#aaa;margin:0 0 12px;">Hi ${name},</p>
    <p style="font-size:15px;line-height:1.7;color:#ccc;margin:0 0 8px;">${body}</p>
    ${cta}
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:32px 0;" />
    <p style="font-size:12px;color:#444;margin:0;">You received this because you have an active ReviewChaser subscription. <a href="${upgradeUrl}" style="color:#22c55e;text-decoration:none;">Manage your plan →</a></p>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

  const { threshold } = req.body;
  if (!VALID_THRESHOLDS.includes(Number(threshold))) {
    return res.status(400).json({ error: "Invalid threshold" });
  }

  try {
    const { data: profile } = await supabase
      .from("rc_profiles")
      .select("email, biz_name, usage_notified")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const monthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
    const existing = profile.usage_notified ?? {};
    const sentThisMonth = existing[monthKey] ?? [];

    if (sentThisMonth.includes(Number(threshold))) {
      return res.json({ skipped: true });
    }

    const upgradeUrl = `${process.env.SITE_URL || "https://almondy.com"}/reviewchaser`;

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "ReviewChaser <hello@almondy.com>",
          to: profile.email,
          subject: subject(Number(threshold)),
          html: emailHtml(Number(threshold), profile.biz_name, upgradeUrl),
        }),
      });
    }

    // Record notification so we don't duplicate within the month
    await supabase
      .from("rc_profiles")
      .update({ usage_notified: { ...existing, [monthKey]: [...sentThisMonth, Number(threshold)] } })
      .eq("id", user.id);

    return res.json({ sent: true });
  } catch (e) {
    console.error("notify-rc-usage error:", e);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
