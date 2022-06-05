import React ,{useState,useEffect,useContext} from "react";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { Context } from "../context/index";
import Link from "next/link"

import { axiosAuth } from "../actions/axios";

const StripeCheckout=()=>{
    const { state: { user,address, contactNumber, saveAddressContact }, dispatch } = useContext(Context);
    const [succeeded,setSucceeded]=useState(false);
    const [error,setError]=useState(null);
    const [processing,setProcessing]=useState("");
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState("");
    const [cartTotal,setCartTotal]=useState(0);

    const [orderNumber,setOrderNumber]=useState("");
  

    const stripe=useStripe();

    const elements=useElements();

    useEffect(()=>{
      console.log('address from ontext')
      console.log(address);
        axiosAuth.post(`/create-payment-intent`,{address, contactNumber, saveAddressContact}).then((res)=>{
          console.log('GOT BACK FROM SERVER (STRIPE CHECKOUT) --- ');
          console.log(res)
            setClientSecret(res.data.clientSecret);
            setCartTotal(res.data.cartTotal);
            setOrderNumber(res.data.orderNumber);

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
            axiosAuth.post(`/user/create-card-order`,
            {payload,orderNumber,address, contactNumber, saveAddressContact}).then((res)=>{
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

    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    return (
        <>
      
      <div className="text-center ">
        <div className="card p-5">
{/*           
            <img
              alt="default image"
              src="https://res.cloudinary.com/delhozzsh/image/upload/v1648724247/makeshipjoy_1_wecqeg.png"
              style={{
                height: "20px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            /> */}
          
       
            <>
            <br /> Total: $
              <p className="font-bold text-2xl text-black ">{cartTotal}</p>
            </>
        
          
        </div>
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link href="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
    )









    

}

export default StripeCheckout;