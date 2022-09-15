import React, { useState } from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { UserContext } from '../../context/user.context';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import './payment-form.styles.scss'

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const { currentUser } = useContext(UserContext)
    const { cartTotal } = useContext(CartContext);
    const [isProcessingPayment, setIsProcessingPAyment] = useState(false)

    const paymentHandler = async(e) => {
        e.preventDefault()

        if(!stripe || !elements) return;

        setIsProcessingPAyment(true)

        const response = await fetch('./netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({amount: cartTotal * 100})
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser : "Guest"
                }
            }
        })

        setIsProcessingPAyment(false)

        if(paymentResult.error) {
            alert(paymentResult.error);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful');
        }
    }

  return (
        <form onSubmit={paymentHandler} className='payment-form'>
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </Button>
        </form>
  )
}

export default PaymentForm