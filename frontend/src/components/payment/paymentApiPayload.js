export let createTransactionPayload = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount
) => {
  return {
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
    amount: amount,
  };
};

export let createVerificationPayload = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  return {
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
  };
};

export let createSubscriptionPayload = (amount, loggedInUser) => {
  return {
    type: amount == "500" ? "STD" : "PRM",
    cost: amount,
    is_active: true,
    subscriber: loggedInUser.id,
  };
};
