export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { q, country = "au" } = req.query;
  if (!q || q.trim().length < 2) return res.json({ results: [] });

  if (!process.env.GOOGLE_PLACES_KEY) {
    return res.status(500).json({ error: "GOOGLE_PLACES_KEY not set" });
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_KEY,
      },
      body: JSON.stringify({
        input: q,
        includedPrimaryTypes: ["establishment"],
        includedRegionCodes: [country.toLowerCase()],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Places API error:", data.error);
      return res.status(500).json({ error: data.error.message || "Places API error" });
    }

    const results = (data.suggestions || []).slice(0, 6).map(s => {
      const p = s.placePrediction;
      return {
        name: p.structuredFormat?.mainText?.text || p.text?.text || "",
        address: p.structuredFormat?.secondaryText?.text || "",
        placeId: p.placeId,
        reviewUrl: `https://search.google.com/local/writereview?placeid=${p.placeId}`,
      };
    });

    return res.json({ results });
  } catch (e) {
    console.error("search-places error:", e);
    return res.status(500).json({ error: "Search failed" });
  }
}
