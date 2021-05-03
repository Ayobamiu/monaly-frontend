import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PayPal extends Component {
  render() {
    return (
      <div>
        <PayPalButton
          options={{ vault: true }}
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: "P-59V25273NS2947038MCHJHOY",
            });
          }}
          shippingPreference="NO_SHIPPING"
          style={{ color: "white" }}
          onApprove={(data, actions) => {
            // Capture the funds from the transaction
            return actions.subscription.get().then(function (details) {
              // Show a success message to your buyer
              alert("Subscription completed");

              // OPTIONAL: Call your server to save the subscription
              return fetch("/paypal-subscription-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID,
                  subscriptionID: data.subscriptionID,
                }),
              });
            });
          }}
        />
      </div>
    );
  }
}

export default PayPal;
