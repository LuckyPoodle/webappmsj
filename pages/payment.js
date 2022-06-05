import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import Header from "../components/Header"

const promise = loadStripe(process.env.NEXT_STRIPE_KEY);


const Payment = () => {
    return (
        <div className="h-screen">
            <Header />
            <div className="container text-center p-10">
                <h1 className="font-bold text-4xl text-black">Complete Your Purchase</h1>
      
                <Elements stripe={promise}>
                    <div className="container p-10">
                        <StripeCheckout />
                    </div>
                </Elements>


            </div>
        </div>
    )
}


export default Payment;