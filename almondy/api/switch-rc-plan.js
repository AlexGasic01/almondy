import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const RC_STRIPE_PRICES = {
  starter: "price_1TULjZKVRE4IsC8Tg4eFyXgj", // $29/mo
  growth:  "price_1TULjsKVRE4IsC8TcVn3PanJ", // $49/mo
  crew:    "price_1TULk6KVRE4IsC8TwbKKDkTj", // $79/mo
};

const VALID_PLANS = ["starter", "growth", "crew"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

  const { newPlan } = req.body;
  if (!VALID_PLANS.includes(newPlan)) return res.status(400).json({ error: "Invalid plan" });

  const newPriceId = RC_STRIPE_PRICES[newPlan];
  if (!newPriceId) {
    return res.status(400).json({ error: "This plan isn't available yet — contact support." });
  }

  try {
    const { data: profile } = await supabase
      .from("rc_profiles")
      .select("email, plan")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) return res.status(404).json({ error: "Profile not found" });
    if (!VALID_PLANS.includes(profile.plan)) {
      return res.status(400).json({ error: "No active paid subscription to switch" });
    }
    if (profile.plan === newPlan) return res.json({ unchanged: true });

    const RC_PRICE_ID_SET = new Set(Object.values(RC_STRIPE_PRICES).filter(Boolean));

    // Find the user's active RC subscription
    const customers = await stripe.customers.list({ email: profile.email, limit: 10 });
    let foundSub = null;
    let foundItem = null;

    outer:
    for (const customer of customers.data) {
      for (const status of ["active", "trialing"]) {
        const subs = await stripe.subscriptions.list({ customer: customer.id, status, limit: 10 });
        for (const sub of subs.data) {
          const rcItem = sub.items.data.find(it => RC_PRICE_ID_SET.has(it.price.id));
          if (rcItem) { foundSub = sub; foundItem = rcItem; break outer; }
        }
      }
    }

    if (!foundSub) return res.status(404).json({ error: "No active RC subscription found" });

    await stripe.subscriptions.update(foundSub.id, {
      items: [{ id: foundItem.id, price: newPriceId }],
      proration_behavior: "always_invoice",
    });

    await supabase.from("rc_profiles").update({ plan: newPlan }).eq("id", user.id);

    return res.json({ switched: true, newPlan });
  } catch (e) {
    console.error("switch-rc-plan error:", e);
    return res.status(500).json({ error: "Failed to switch plan — please try again or contact support." });
  }
}
