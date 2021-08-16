import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function CheckoutComplete() {
  return (
    <div className="text-center">
      <h1 className="display-small my-4">Congratulations!!</h1>
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-success my-4"
        size="4x"
      />
      <p className="text-small">Payment Successful</p>
      <NavLink to="/" className="">
        Go Home
      </NavLink>
    </div>
  );
}
