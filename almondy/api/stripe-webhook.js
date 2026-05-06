import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PC_PRICE_TO_PLAN = {
  price_1TTGeLKVRE4IsC8TVpFheHv1: "pro",  // Pro Monthly
  price_1TTGgZKVRE4IsC8TePFiDm3A: "pro",  // Pro Annual
  price_1TTGezKVRE4IsC8TkKNoISYG: "max",  // Max Monthly
  price_1TTGh5KVRE4IsC8TDlCvwreJ: "max",  // Max Annual
};

const RC_PRICE_TO_PLAN = {
  price_1TTu1PKVRE4IsC8ThYKGACBz: "growth",
  price_1TTu1pKVRE4IsC8T19RkUMWr: "crew",
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
    const customerId = sub.customer;
    const subscriptionId = sub.id;
    const status = sub.status;

    if (RC_PRICE_TO_PLAN[priceId] !== undefined) {
      // ReviewChaser subscription
      const rcPlan = (status === "active" || status === "trialing")
        ? RC_PRICE_TO_PLAN[priceId]
        : "expired";

      // Find user by userId in metadata, or fall back to email
      const metaUserId = sub.metadata?.userId;
      if (metaUserId) {
        await supabase.from("rc_profiles").update({ plan: rcPlan }).eq("id", metaUserId);
      } else {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.email) {
          await supabase.from("rc_profiles").update({ plan: rcPlan }).eq("email", customer.email);
        }
      }
    } else {
      // PayChaser subscription
      const plan = PC_PRICE_TO_PLAN[priceId] || "free";
      const activePlan = (status === "active" || status === "trialing") ? plan : "free";

      let userId = null;
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (existing) {
        userId = existing.id;
      } else {
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
        await supabase.from("profiles").update({
          plan: activePlan,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
        }).eq("id", userId);
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const priceId = sub.items.data[0]?.price?.id;
    const customerId = sub.customer;

    if (RC_PRICE_TO_PLAN[priceId] !== undefined) {
      const metaUserId = sub.metadata?.userId;
      if (metaUserId) {
        await supabase.from("rc_profiles").update({ plan: "expired" }).eq("id", metaUserId);
      } else {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.email) {
          await supabase.from("rc_profiles").update({ plan: "expired" }).eq("email", customer.email);
        }
      }
    } else {
      await supabase.from("profiles").update({ plan: "free" }).eq("stripe_customer_id", customerId);
    }
  }

  res.status(200).json({ received: true });
}

export const config = {
  api: { bodyParser: false },
};
