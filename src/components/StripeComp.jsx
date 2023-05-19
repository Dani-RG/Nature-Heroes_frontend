import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51N9WFJHupFniTzZZOpGJO3AAmCXXfwPWhhr6cgjooKjieFRh8taHug4OfE6wIdEbYtRCPkkmgyTU17ysz5CwVbIj00aTgMjQQW')



const CheckoutForm = () => {

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error) {
      console.log(paymentMethod)
    }
  }

  return <form onSubmit={handleSubmit} className='pay_card'>
    <CardElement />
    <button className='buy_btn'>
      Buy
    </button>
  </form>
}

export default function StripeComp() {
  return (
    <Elements stripe={(stripePromise)}>
        <CheckoutForm />
    </Elements>
  )
}
