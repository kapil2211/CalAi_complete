import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./PaymentForm";
import { Navigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';

const stripePromise = loadStripe("pk_test_51O3juaSFUzG000TSlpVlPO1QSykakaeTkfxpdn2Hfsu9BPO0zhA7W7tIWRKVt6xzOIWx7MMzb3Cedxh4S1KBELsn00NAGy31cm");
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};
const Payment = () => {
 

  const { currentUser } = useUserAuth();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm   options={{options}} />
    </Elements>
  );
};

export default Payment;
