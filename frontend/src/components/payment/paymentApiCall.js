import axios from "axios";

export const createOrder        = (orderPayload)        => axios.post("http://127.0.0.1:8000/payment/order", orderPayload);
export const createTransaction  = (transactionPayload)  => axios.post('http://127.0.0.1:8000/payment/transaction', transactionPayload);
export const verifyPayment      = (verificationPayload) => axios.post('http://localhost:8000/payment/transaction/verify_payment', verificationPayload);
export const createSubscription = (subscriptionPayload) => axios.post('http://localhost:8000/account/subscription', subscriptionPayload)