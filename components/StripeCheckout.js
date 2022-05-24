import React ,{useState,useEffect,useContext} from "react";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { Context } from "../context/index";

import { axiosAuth } from "../actions/axios";
const StripeCheckout=()=>{
    const { state: { user }, dispatch } = useContext(Context);
    const [succeeded,setSucceeded]=useState(false);
    const [error,setError]=useState(null);
    const [processing,setProcessing]=useState("");
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState("");
    const [cartTotal,setCartTotal]=useState("");
    const [payable,setPayable]=useState(0);

    const stripe=useStripe();

    const elements=useElements();

    useEffect(()=>{

        axiosAuth.post(`/create-payment-intent`).then((res)=>{
            setClientSecret(res.data.clientSecret);
            setCartTotal(res.data.cartTotal);
            setPayable(res.data.payable)
        })

    },[]);


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name:e.target.name.value,
                }
            }
        });

        if (payload.error){
            setError(`Payment Failed - ${payload.error.message}`);
            setProcessing(false);
        }else{
            //create card order in db
            axiosAuth.post(`/user/order`,
            {payload}).then((res)=>{
                if (res.data.ok){
                    dispatch({
                        type:'CLEARCART',
                    })

                }
            });

            setError(null);
            setProcessing(false);
            setSucceeded(true);

        }
    }

    const handleChange=async(e)=>{
        setDisabled(e.empty);
        setError(e.error?e.error.message:"");
    }


    return (
        <>

            {!succeeded && (
                <div className="text-center pb-5">
                    <div className="card">
                        {payable}   -   {cartTotal}
                    </div>

                </div>
            )}


        </>
    )









    

}