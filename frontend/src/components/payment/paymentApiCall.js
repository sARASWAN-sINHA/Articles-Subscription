import axios from "axios";

export const createOrder        = (orderPayload)        => axios.post(`${import.meta.env.VITE_BACKEND_IP}/payment/order`, orderPayload);
export const createTransaction  = (transactionPayload)  => axios.post(`${import.meta.env.VITE_BACKEND_IP}/payment/transaction`, transactionPayload);
export const verifyPayment      = (verificationPayload) => axios.post(`${import.meta.env.VITE_BACKEND_IP}/payment/transaction/verify_payment`, verificationPayload);
export const createSubscription = (subscriptionPayload) => axios.post(`${import.meta.env.VITE_BACKEND_IP}/account/subscription`, subscriptionPayload)