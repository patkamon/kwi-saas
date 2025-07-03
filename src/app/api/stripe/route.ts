// app/api/stripe/route.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body)
    const { price, packageName, amount, amount_string, desc, user_id } = body;

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      metadata: {
         // get from session storage
         user_id: user_id,
         credit_amount: amount.toString(),
      },
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            unit_amount: price * 100, // Convert to cents
            product_data: {
              name: packageName,
              description: `${amount_string}  ${desc}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return Response.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
