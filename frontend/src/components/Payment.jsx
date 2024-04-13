import React from 'react';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {

    return (
        <div className='w-full'>
            <button type="button"> Pay Now! </button>
        </div>
    )
}

export default Payment