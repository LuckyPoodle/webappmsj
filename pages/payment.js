import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'
import Header from '../components/Header'

const promise = loadStripe(process.env.NEXT_STRIPE_KEY)

const Payment = () => {
  return (
    <div className='h-screen'>
      <Header />
      <div className='container w-screen p-1'>
        <Elements stripe={promise}>
          <div className='container p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h1 className='font-bold text-4xl text-center text-black '>
              Complete Your Purchase
            </h1>
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </div>
  )
}

export default Payment
