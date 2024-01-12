/**
 * Collect card information
 * --------------
 * 1. stripe install
 * 2. card loadStripe
 * : pk
 * 3. card element
 * 4. card form
 * 5. stripe, elements
 * 6. check card error and display error
 *
 */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
const CheckoutForm = ({ order }) => {
  console.log(order);
  const [cardError, setCardError] = useState();
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  console.log(order);
  const { _id, agencyName, price, email, name, contact } = order;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `bearer ${localStorage.getItem("Eventhive-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //    console.log(error)
      setCardError(error.message);
    } else {
      setCardError("");
    }
   
    setSuccess("");
    console.log('je')
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: agencyName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        name,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
        contact,
        agencyName,
      };
      console.log(payment);
      fetch(`${process.env.REACT_APP_API_URL}/payments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("Eventhive-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setSuccess("congrats ! your payment completed");
          setTransactionId(paymentIntent.id);
          
          navigate("/orders");
        });
    }
    setProcessing(false);
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8ss5p0j', 'template_ks8srhg',  'bSFXQ1qW4WoYJm7aH')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
          onSubmit={sendEmail}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
