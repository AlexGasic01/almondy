export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const params = new URLSearchParams(req.query);
    const r = await fetch(`https://api.cal.com/v1/slots?${params}`);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("cal-slots error:", err);
    return res.status(500).json({ error: "Failed to fetch slots" });
  }
}
