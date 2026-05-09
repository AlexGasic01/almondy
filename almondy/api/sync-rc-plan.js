import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const RC_PRICE_TO_PLAN = {
  "price_1TULjZKVRE4IsC8Tg4eFyXgj": "starter",
  "price_1TULjsKVRE4IsC8TcVn3PanJ": "growth",
  "price_1TULk6KVRE4IsC8TwbKKDkTj": "crew",
};

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

    // Search Stripe for an active RC subscription by customer email
    const customers = await stripe.customers.list({ email: profile.email, limit: 5 });
    let newPlan = null;

    let trialEndsAt = null;

    outer:
    for (const customer of customers.data) {
      for (const status of ["trialing", "active"]) {
        const subs = await stripe.subscriptions.list({ customer: customer.id, status, limit: 5 });
        for (const sub of subs.data) {
          const priceId = sub.items.data[0]?.price?.id;
          if (RC_PRICE_TO_PLAN[priceId]) {
            newPlan = RC_PRICE_TO_PLAN[priceId];
            if (status === "trialing" && sub.trial_end) {
              trialEndsAt = new Date(sub.trial_end * 1000).toISOString();
            }
            break outer;
          }
        }
      }
    }

    if (!newPlan) return res.json({ plan: profile.plan, updated: false });

    const updateData = { plan: newPlan };
    if (trialEndsAt) updateData.stripe_trial_ends_at = trialEndsAt;
    else if (newPlan === profile.plan && !trialEndsAt) updateData.stripe_trial_ends_at = null;

    if (newPlan !== profile.plan || trialEndsAt) {
      await supabase.from("rc_profiles").update(updateData).eq("id", user.id).then(() => {}).catch(() => {});
    }

    return res.json({ plan: newPlan, trial_ends_at: trialEndsAt, updated: newPlan !== profile.plan });
  } catch (e) {
    console.error("sync-rc-plan error:", e);
    return res.status(500).json({ error: "Failed to sync plan" });
  }
}
