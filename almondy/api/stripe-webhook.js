import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PRICE_TO_PLAN = {
  price_1TTGeLKVRE4IsC8TVpFheHv1: "pro",  // Pro Monthly
  price_1TTGgZKVRE4IsC8TePFiDm3A: "pro",  // Pro Annual
  price_1TTGezKVRE4IsC8TkKNoISYG: "max",  // Max Monthly
  price_1TTGh5KVRE4IsC8TDlCvwreJ: "max",  // Max Annual
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const sub = event.data.object;

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated"
  ) {
    const priceId = sub.items.data[0]?.price?.id;
    const plan = PRICE_TO_PLAN[priceId] || "free";
    const customerId = sub.customer;
    const subscriptionId = sub.id;
    const status = sub.status; // active, trialing, past_due, canceled

    const activePlan = (status === "active" || status === "trialing") ? plan : "free";

    // Find user by stripe_customer_id, or fall back to email
    let userId = null;

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (existing) {
      userId = existing.id;
    } else {
      // Try to match by email via Stripe customer object
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.email) {
        const { data: byEmail } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", customer.email)
          .single();
        if (byEmail) userId = byEmail.id;
      }
    }

    if (userId) {
      await supabase
        .from("profiles")
        .update({
          plan: activePlan,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
        })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const customerId = sub.customer;
    await supabase
      .from("profiles")
      .update({ plan: "free" })
      .eq("stripe_customer_id", customerId);
  }

  res.status(200).json({ received: true });
}

// Vercel needs raw body for Stripe signature verification
export const config = {
  api: { bodyParser: false },
};
