'use client';

import CheckoutWizard from '@/src/components/CheckoutWizard';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { Store } from '@/src/utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Please select a payment method');
    }

    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }

    setSelectedPaymentMethod(paymentMethod || '');
    console.log('paymentMethod', paymentMethod);
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <>
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button hover:bg-gray-200  active:bg-gray-300"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </>
  );
};

export default PaymentPage;
