export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { q } = req.query;
  if (!q || q.trim().length < 2) return res.json({ results: [] });

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q)}&key=${process.env.GOOGLE_PLACES_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = (data.results || []).slice(0, 5).map(p => ({
      name: p.name,
      address: p.formatted_address,
      placeId: p.place_id,
      reviewUrl: `https://search.google.com/local/writereview?placeid=${p.place_id}`,
    }));

    return res.json({ results });
  } catch (e) {
    console.error("search-places error:", e);
    return res.status(500).json({ error: "Search failed" });
  }
}
