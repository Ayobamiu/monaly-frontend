import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCarts } from "../../../store/productSlice";

const BackButton = ({ showCart = true, text, ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCarts());
  }, []);
  const carts = useSelector((state) => state.app.products.carts);
  return (
    <div id="backButton">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div
            className="shadow-small p-3 bg-white rounded-pill back-arrow"
            onClick={() => props.props.history.goBack()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h1 className="display-small">{text}</h1>
          {showCart && (
            <NavLink
              to="/cart"
              className="shadow-small p-3 bg-white rounded-pill back-arrow position-relative"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="position-absolute badge bg-danger text-white rounded-pill cart-count">
                {carts.length}
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackButton;
