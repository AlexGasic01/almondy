import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { priceId, email, trial } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    ...(trial && { subscription_data: { trial_period_days: 7 } }),
    success_url: `${req.headers.origin}?session=success`,
    cancel_url: `${req.headers.origin}?session=cancel`,
  });

  res.json({ url: session.url });
}
