export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { q } = req.query;
  if (!q || q.trim().length < 2) return res.json({ results: [] });

  if (!process.env.GOOGLE_PLACES_KEY) {
    return res.status(500).json({ error: "GOOGLE_PLACES_KEY not set" });
  }

  // Use Autocomplete for live typing, then Text Search as fallback for precision
  const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(q)}&types=establishment&key=${process.env.GOOGLE_PLACES_KEY}`;

  try {
    const acRes = await fetch(autocompleteUrl);
    const acData = await acRes.json();

    if (acData.status !== "OK" && acData.status !== "ZERO_RESULTS") {
      console.error("Places Autocomplete error:", acData.status, acData.error_message);
      return res.status(500).json({ error: acData.error_message || acData.status });
    }

    const predictions = acData.predictions || [];

    // For each prediction we already have place_id — no extra call needed
    const results = predictions.slice(0, 6).map(p => ({
      name: p.structured_formatting?.main_text || p.description,
      address: p.structured_formatting?.secondary_text || "",
      placeId: p.place_id,
      reviewUrl: `https://search.google.com/local/writereview?placeid=${p.place_id}`,
    }));

    return res.json({ results });
  } catch (e) {
    console.error("search-places error:", e);
    return res.status(500).json({ error: "Search failed" });
  }
}
