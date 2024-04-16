import React from 'react'
import SubscriptionCard from '../components/Card/SubscriptionCard'

const BrowseSubscription = () => {
    return (
        <div className='w-full '>
            <div className='flex justify-center m-4'>
                <div className='bg-white p-5 rounded-2xl m-4 w-[30%] text-center'>
                    {"Subscription Plans".toUpperCase()}
                </div>
            </div>
            <div className='flex flex-1 justify-around '>
                <SubscriptionCard subscriptionType={"standard"} amount={"500"}/>
                <SubscriptionCard subscriptionType={"premium"} amount={"650"}/>
            </div>
        </div>
    )
}

export default BrowseSubscription