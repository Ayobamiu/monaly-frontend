import React, { useContext, useEffect } from "react";
import "./css/style.css";
import BackButton from "../../includes/BackButton/BackButton";
import {
  faAngleDown,
  faAngleUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCarts, updateProductInCart } from "../../../store/productSlice";
import { loadLoggedInUser } from "../../../store/authSlice";
import CartContext from "../../../store/contexts/cartContext";
import { saveToLocalStorage } from "../../../assets/js/localStorage";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cartLoadStatus = useSelector(
    (state) => state.app.products.cartLoadStatus
  );
  const loadingCarts = useSelector((state) => state.app.products.loadingCarts);
  // const carts = useSelector((state) => state.app.products.carts);
  const { carts, setCarts } = useContext(CartContext);

  useEffect(() => {
    dispatch(loadCarts());
    dispatch(loadLoggedInUser());
  }, []);
  let total = 0;
  for (let index = 0; index < carts.length; index++) {
    const cart = carts[index];
    total += cart.price * cart.quantity;
  }
  const updateCart = (product) => {
    const currentOrders = carts;
    const targetIndex = currentOrders.findIndex((i) => i._id == product._id);
    currentOrders.splice(targetIndex, 1, product);
    setCarts([...currentOrders]);
    saveToLocalStorage("carts", currentOrders);
  };
  const removeFromCart = (product) => {
    const currentOrders = carts;
    const targetIndex = currentOrders.findIndex((i) => i._id == product._id);
    currentOrders.splice(targetIndex, 1);
    setCarts((initialState) => [...currentOrders]);
    saveToLocalStorage("carts", currentOrders);
  };
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
              <div className="order-item  mb-2 d-flex justify-content-between">
                <div
                  className="order-item-img bg-secondary"
                  style={{
                    backgroundImage: `url(${
                      cart && cart.images.length > 0 && cart.images[0].image
                    })`,
                  }}
                />
                <div className="text m-2 text-truncate flex-grow-1">
                  <div className="text-truncate">{cart.title}</div>
                  <div>
                    <strong>NGN{cart.price}</strong> <small>X</small>{" "}
                    <small>{cart.quantity}</small>
                  </div>
                  <span
                    className="text-danger"
                    onClick={() => {
                      removeFromCart(cart);
                    }}
                  >
                    Remove
                  </span>
                </div>
                <div className="d-flex flex-column justify-content-around">
                  <div className="icon bg-secondary">
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      color="white"
                      onClick={() => {
                        updateCart({ ...cart, quantity: cart.quantity + 1 });
                      }}
                    />
                  </div>
                  <div className="icon bg-secondary">
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      color="white"
                      onClick={() => {
                        if (cart.quantity > 1) {
                          updateCart({ ...cart, quantity: cart.quantity - 1 });
                        }
                      }}
                    />
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
