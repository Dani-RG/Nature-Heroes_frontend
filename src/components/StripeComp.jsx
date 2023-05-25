import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import creditsService from '../services/creditsService';

export default function StripeComp() {
  const stripePromise = loadStripe('pk_test_51N9WFJHupFniTzZZOpGJO3AAmCXXfwPWhhr6cgjooKjieFRh8taHug4OfE6wIdEbYtRCPkkmgyTU17ysz5CwVbIj00aTgMjQQW')

  const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = 100;
    
    const handleCheckout = async () => {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      if (!error) {
        const { id } = paymentMethod;
        const data = await creditsService.checkout(
          {id, amount}
        )
        console.log(data)
      }
    }


    const handleSubmit = (e) => {
      e.preventDefault();
      handleCheckout();
    }

    return <form onSubmit={handleSubmit} className='pay_card'>
      <h3>100 credits</h3>
      <CardElement />
      <button className='buy_btn'>
        Buy
      </button>
    </form>
  }

  return (
    <Elements stripe={(stripePromise)}>
        <CheckoutForm />
    </Elements>
  )
}
