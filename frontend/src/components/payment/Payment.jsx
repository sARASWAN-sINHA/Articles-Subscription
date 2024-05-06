import axios from "axios";
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import useRazorpay from "react-razorpay";

import { CustomToastContainer, generateErrorToastr } from "../Toastr";
import { createSubscriptionPayload, createTransactionPayload, createVerificationPayload } from "./paymentApiPayload";
import { createOrder, createSubscription, createTransaction, verifyPayment } from "./paymentApiCall";




const Payment = (props) => {

  /**
   * 
   * Flow for making transactions using Razorpay:-
   *  1. User places an order by (createOrder) to buy a subscription.
   *  2. Verification of the payment (verifyPayment) is done on Razorpay's end. (razorpay client gateway creation **)
   *  3. If verification is successful, subscription (craeteSubscription) is craeted for the user.
   * 
   */

  const { amount } = props;
  const loggedInUser = useSelector(state => state.userState.user);
  const navigate = useNavigate();

  const [Razorpay] = useRazorpay();


  const handlePayment = () => {

    const createOrderPayload = {
      currency: "INR",
      amount
    };

    let subscriptionPayload = createSubscriptionPayload(amount, loggedInUser);

    createOrder(createOrderPayload)
      .then(
        ((response) => {

          const options = {
            key: import.meta.env.VITE_RAZORPAY_CLIENT_API_KEY,
            amount,
            currency: "INR",
            name: "Saras-Soch",
            order_id: response.data.data.id,
            handler: async function (response) {

              let transactionPayload = createTransactionPayload(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, amount);
              await createTransaction(transactionPayload);

              let verificationPayload = createVerificationPayload(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
              verifyPayment(verificationPayload)
                .then(async response => response.data.data ? await createSubscription(subscriptionPayload) : "")
                .then(navigate("/client/account/me"))
                .then(navigate("/client/browse-articles"))
                .catch(error => generateErrorToastr(error.message))

            },
            prefill: {
              name: loggedInUser.first_name + " " + loggedInUser.last_name,
              email: loggedInUser.email
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new Razorpay(options); // ** razorpay client creation using the options defined above

          rzp1.on("payment.failed", function (response) {
            generateErrorToastr(response.error.description)
          });

          rzp1.open();

        })
      )
  }

  return (
    <>
      <CustomToastContainer />
      <div className='w-full text-center'>
        <button type="button" className='bg-yellow-400 p-5 text-center font-bold w-1/3 shadow-xl' onClick={handlePayment}> Pay Rs. {amount} now ! </button>
      </div>
    </>
  )
}

export default Payment