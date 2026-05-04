export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, origin } = req.body;
  const appOrigin = origin || "https://almondy.app";

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PayChaser <hello@almondy.app>",
        to: [email],
        subject: "Your PayChaser sign-in link",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#080808;color:#fff">
            <h2 style="font-size:22px;font-weight:800;margin:0 0 12px;letter-spacing:-0.5px">Sign in to PayChaser</h2>
            <p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 28px">
              Click the button below to sign in. This link expires in 15 minutes.
            </p>
            <a href="${appOrigin}?magic=true&email=${encodeURIComponent(email)}"
               style="display:inline-block;background:#fff;color:#000;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px">
              Sign in to PayChaser →
            </a>
            <p style="color:#333;font-size:12px;margin-top:32px">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Resend error");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
