import React from 'react'
import Payment from '../Payment';

const SubscriptionCard = (props) => {

    const standardSubscriptionTypeMessageArray = ["Join us for standard access here", "Limited article access"];
    const premiumSubscriptionTypeMessageArray = ["Elevate your experience with premium here", "Full article access"];
    const { subscriptionType, amount } = props;
    const subscriptionTypeMessageArray = subscriptionType.toLowerCase() === 'standard' ? [...standardSubscriptionTypeMessageArray] : [...premiumSubscriptionTypeMessageArray];
    return (
        <div className='bg-white p-5 rounded-2xl flex flex-col gap-3 justify-center align-middle w-1/3' >
            <div className='text-center'>{subscriptionType.toUpperCase()} SUBSCRIPTION</div>
            <hr />
            <div className='text-center text-slate-500 m-2'>{subscriptionTypeMessageArray[0]}:</div>
            <div className='text-center m-2'>({subscriptionTypeMessageArray[1]})</div>
            <hr />
            <div className="w-full flex justify-center align-middle ">
                <Payment amount={amount} />
            </div>
        </div>
    )
}

export default SubscriptionCard