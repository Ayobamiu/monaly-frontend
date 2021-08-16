import React, { useEffect } from "react";
import "./css/style.css";
import BackButton from "../../includes/BackButton/BackButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCarts, updateProductInCart } from "../../../store/productSlice";
import { loadLoggedInUser } from "../../../store/authSlice";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cartLoadStatus = useSelector(
    (state) => state.app.products.cartLoadStatus
  );
  const loadingCarts = useSelector((state) => state.app.products.loadingCarts);
  const carts = useSelector((state) => state.app.products.carts);
  useEffect(() => {
    dispatch(loadCarts());
    dispatch(loadLoggedInUser());
  }, []);
  let total = 0;
  for (let index = 0; index < carts.length; index++) {
    const cart = carts[index];
    total += cart.product.price * cart.quantity;
  }
  return (
    <div id="cartPage">
      {loadingCarts && (
        <div className="loader-full">
          <div className="loader"></div>
        </div>
      )}
      <BackButton text="Carts" props={props} />
      <div className="container">
        <div className="row align-items-start my-5 flex-wrap">
          <div className="col-md-8 col-12">
            {!loadingCarts && carts.length === 0 && (
              <div className="border p-5 rounded w-100 text-center my-5">
                <span className="text-medium">You have no items in cart</span>
                {cartLoadStatus && (
                  <span className="text-medium">
                    {cartLoadStatus}{" "}
                    <button
                      className="link link-primary"
                      onClick={() => dispatch(loadCarts())}
                    >
                      Reload
                    </button>
                  </span>
                )}
              </div>
            )}
            {carts.map((cart, index) => (
              <div className="cart-item bg-light my-2 d-flex p-1" key={index}>
                <div
                  className="cart-item-image bg-secondary"
                  style={{
                    backgroundImage: `url(${
                      cart &&
                      cart.product &&
                      cart.product.images.length > 0 &&
                      cart.product.images[0].image
                    })`,
                  }}
                ></div>
                <div className="w-100 d-flex justify-content-between flex-column p-2">
                  <div className="d-flex justify-content-between">
                    <h1 className="link-medium">
                      {cart && cart.product && cart.product.name}
                    </h1>
                    <FontAwesomeIcon icon={faTrash} color="grey" />
                  </div>
                  <div className="d-flex justify-content-between">
                    <input
                      type="number"
                      name="count"
                      id="count"
                      className="cart-item-input link-small"
                      defaultValue={cart && cart.quantity}
                      onChange={(e) => {
                        dispatch(updateProductInCart(cart._id, e.target.value));
                      }}
                      min={1}
                    />
                    <span className="link-medium">
                      NGN{" "}
                      {(cart && cart.quantity) *
                        (cart && cart.product && cart.product.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 col-12 hide-900">
            {carts.length > 0 && (
              <div className="card border p-3 rounded  ">
                <div className="display-small">Sub-Total</div>
                <div className="display-small text-muted">NGN {total}</div>
                <NavLink to="/checkout">
                  <button className="primary-btn my-2">
                    Proceed to Checkout
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed-bottom bg-white border-top p-3 container show-900">
        <div className="row g-2 align-items-center">
          <div className="col-6">
            <small className="link-medium">
              Sub-Total
              <span className="link-medium text-muted">NGN {total}</span>
            </small>
          </div>
          <div className="col-6">
            <NavLink to="/checkout">
              <button className="primary-btn my-2 custom-btn-sm">
                Proceed to Checkout
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
