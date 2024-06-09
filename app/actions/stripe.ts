"use server";

import type {Stripe} from "stripe";

import {headers} from "next/headers";

import {CURRENCY} from "@/config";
import {formatAmountForStripe} from "@/utils/stripe-helpers";
import {stripe} from "@/lib/stripe";
import { auth } from "@/auth";
import {redirect} from "next/navigation";

export async function createCheckoutSession(
    data: {
        redirectUrl: string;
    },
) {
    const origin: string = headers().get("origin") as string;
    const session = await auth()

    if (!session?.user) {
        return {client_secret: null, url: null};
    }

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "pay",
            line_items: [
                {
                    quantity: 1,
                    price: process.env.STRIPE_PRICE_ID as string,
                },
            ],
            metadata: {
              userId: session.user.id
            },
            success_url: `${data.redirectUrl}/?session_id={CHECKOUT_SESSION_ID}&status=success`,
            cancel_url: `${data.redirectUrl}/?status=canceled`,
            allow_promotion_codes: true,
        });

    console.log(checkoutSession.url)

    if (!checkoutSession.url) {
        return
    }

    redirect(checkoutSession.url)
}

export async function createPaymentIntent(
    data: FormData,
): Promise<{ client_secret: string }> {
    const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
            amount: formatAmountForStripe(
                Number(data.get("customDonation") as string),
                CURRENCY,
            ),
            automatic_payment_methods: {enabled: true},
            currency: CURRENCY,
        });

    return {client_secret: paymentIntent.client_secret as string};
}