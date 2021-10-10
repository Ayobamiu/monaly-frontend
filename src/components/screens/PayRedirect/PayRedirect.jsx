import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import "./css/styles.css";

export default function PayRedirect() {
  return (
    <div className="d-flex flex-column justify-content-center full align-items-center w-100 bg-light text-center p-3">
      <FontAwesomeIcon
        icon={faCheckCircle}
        size="5x"
        className="text-success"
      />
      <h3>Your order is complete!</h3>
      <p>You will be recieving a confirmation email with order details.</p>
      <NavLink to="/" className="primary-btn-inverse custom-btn-sm">
        Go Home
      </NavLink>
    </div>
  );
}
