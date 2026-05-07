import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const RC_PRICE_IDS = new Set([
  "price_1TULjZKVRE4IsC8Tg4eFyXgj", // starter $29/mo
  "price_1TULjsKVRE4IsC8TcVn3PanJ", // growth $49/mo
  "price_1TULk6KVRE4IsC8TwbKKDkTj", // crew $79/mo
]);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data: profile } = await supabase
      .from("rc_profiles")
      .select("email, plan")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) return res.status(404).json({ error: "Profile not found" });
    if (profile.plan === "trial" || profile.plan === "expired") {
      return res.status(400).json({ error: "No active subscription to cancel" });
    }

    // Find and cancel all active RC subscriptions for this email
    const customers = await stripe.customers.list({ email: profile.email, limit: 10 });
    for (const customer of customers.data) {
      for (const status of ["active", "trialing"]) {
        const subs = await stripe.subscriptions.list({ customer: customer.id, status, limit: 10 });
        for (const sub of subs.data) {
          const isRC = sub.items.data.some(item => RC_PRICE_IDS.has(item.price.id));
          if (isRC) await stripe.subscriptions.cancel(sub.id);
        }
      }
    }

    // Mark expired in Supabase (webhook will also do this, but cover immediate UI)
    await supabase.from("rc_profiles").update({ plan: "expired" }).eq("id", user.id);

    return res.json({ cancelled: true });
  } catch (e) {
    console.error("Cancel RC subscription error:", e);
    return res.status(500).json({ error: "Failed to cancel subscription" });
  }
}
