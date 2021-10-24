import React from "react";
import PayPal from "../../includes/PayPal/PayPal";
import "./css/style.css";

const Pay = () => {
  return (
    <div id="payment">
      <div className="card">
        <div className="card-body">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis,
          magni?
          {/* <div id="paypal-button-container-P-59V25273NS2947038MCHJHOY"></div> */}
          <PayPal />
        </div>
      </div>
    </div>
  );
};

export default Pay;
