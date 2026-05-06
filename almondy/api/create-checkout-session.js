import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { priceId, email, userId, trial, successUrl, cancelUrl, metadata } = req.body;

  const subscriptionData = {};
  if (trial) subscriptionData.trial_period_days = 7;
  if (userId || metadata) {
    subscriptionData.metadata = { userId: userId ?? "", ...(metadata ?? {}) };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: subscriptionData,
    metadata: { userId: userId ?? "", ...(metadata ?? {}) },
    success_url: successUrl || `${req.headers.origin}/?session=success`,
    cancel_url: cancelUrl || `${req.headers.origin}/?session=cancel`,
  });

  res.json({ url: session.url });
}
