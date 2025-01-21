import { Stripe } from "stripe";
import { config } from "../../../lib/config";

const stripe = new Stripe(config.STRIPE_SECRET_KEY)

export async function POST(request: Request) {

    const body = await request.json();
    const { name, email, amount } = body;

    if (!name || !email || !amount) {
        return new Response(JSON.stringify({
            errror: 'Please enter a valid email address',
            status: 400
        }))
    }

    let customer;
    const existingCustomer = await stripe.customers.list({ email })
    if (existingCustomer.data.length > 0) {
        customer = existingCustomer.data[0];
    } else {
        const newCustomer = await stripe.customers.create({ name, email })
        customer = newCustomer
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2024-10-28.acacia'
         }
    )
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never"
        }
    })
    return new Response(JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id
    }))

}