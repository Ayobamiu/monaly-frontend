/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { addSubscription } from "../../../store/authSlice";
import AppButton from "../AppButton/AppButton";

export default function SubscribeButton({ title }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user.profile);
  const config = {
    public_key: "FLWPUBK-2e47da611ef1439c41b6685671258d8f-X",
    tx_ref: Date.now(),
    payment_plan: 40518,
    amount: 5,
    currency: "USD",
    payment_options: "card",
    customer: {
      email: user.email,
      name: user.firstName,
    },
    customizations: {
      title: "Monaly PRO",
      description: "Subscription to Monaly PRO",
      logo: "https://apply-to-usman.s3.eu-west-2.amazonaws.com/monaly_logo.svg",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <AppButton
      class='btn btn-block btn-primary text-uppercase my-2'
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            if (response.status === "successful") {
              dispatch(addSubscription());
            }
            closePaymentModal(); // this will close the modal programmatically
          },

          onClose: () => {},
        });
      }}
      text={title}
    />
  );
}
