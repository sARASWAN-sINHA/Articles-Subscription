import axios from "axios";
import React from 'react';
import { useSelector } from 'react-redux';

import useRazorpay from "react-razorpay";

const Payment = (props) => {

  const { amount } = props;
  const loggedInUser = useSelector(state => state.userState.user);
  const [Razorpay] = useRazorpay();

  const handlePayment = () => {
    const payload = {
      currency: "INR",
      amount
    };
    axios.post(
      'http://127.0.0.1:8000/payment/order',
      payload
    )
      .then(
        ((response) => {

          const options = {
            key: import.meta.env.VITE_RAZORPAY_CLIENT_API_KEY,
            amount,
            currency: "INR",
            name: "Saras-Soch",
            order_id: response.data.data.id,
            handler: async function (response) {

              let transactionPayload = {
                "razorpay_order_id": response.razorpay_order_id,
                "razorpay_payment_id": response.razorpay_payment_id,
                "razorpay_signature": response.razorpay_signature,
                "amount": amount
              };
              await axios.post('http://127.0.0.1:8000/payment/transaction', transactionPayload);

              let verificationPayload = {
                "razorpay_order_id": response.razorpay_order_id,
                "razorpay_payment_id": response.razorpay_payment_id,
                "razorpay_signature": response.razorpay_signature,
              };
              axios.post('http://localhost:8000/payment/transaction/verify_payment', verificationPayload)
                .then(async response => {
                  response.data.data ? await axios.post('http://localhost:8000/account/subscription', {
                    "type": amount == "500" ? "STD" : "PRM",
                    "cost": amount,
                    "is_active": true,
                    "subscriber": loggedInUser.id
                  }) :
                    "";
                })
            },
            prefill: {
              name: loggedInUser.first_name + " " + loggedInUser.last_name,
              email: loggedInUser.email
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new Razorpay(options);

          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });

          rzp1.open();

        })
      )
  }

  return (
    <div className='w-full text-center'>
      <button type="button" className='bg-yellow-400 p-5 text-center font-bold w-1/3 shadow-xl' onClick={handlePayment}> Pay Rs. {amount} now ! </button>
    </div>
  )
}

export default Payment