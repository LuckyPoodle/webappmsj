import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";

const promise=loadStripe(process.env.NEXT_STRIPE_KEY);


const Payment=()=>{
    return (
        <div className="container p-5 text-center">
            <h4>Complete Your Purchase</h4>
            <h6></h6>
            <Elements stripe={promise}>
                <div className="col">
                    <StripeCheckout />
                </div>
            </Elements>

        </div>
    )
}


export default Payment;