import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getLoggedInUser, loadLoggedInUser } from "../../../store/authSlice";
import { loadOrders, updateOrder } from "../../../store/productSlice";
import "./css/style.css";

const OrdersPage = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);
  if (!loggedInUser) {
    window.location = "/sign-in";
  }
  const loadingOrders = useSelector(
    (state) => state.app.products.loadingOrders
  );
  const orders = useSelector((state) => state.app.products.orders);
  const user = useSelector((state) => state.app.user.profile);
  useEffect(() => {
    if (orders.length === 0) {
      dispatch(loadOrders());
    }
    dispatch(loadLoggedInUser());
  }, [dispatch, orders.length]);
  const OrderItem = ({ order }) => {
    return (
      <div className="my-2 card-body border rounded rounded-4">
        <div className="link-x-small">
          Order ID: <span className="text-muted text-x-small">{order._id}</span>
        </div>
        <div className="link-x-small">
          Order Date:{" "}
          <span className="text-muted text-x-small">
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
        <hr />

        <div className="text-small">
          {order.products &&
            order.products.length > 0 &&
            order.products[0].product &&
            order.products[0].product.title}
        </div>
        <div className="link-small mb-2">
          Total: <span className="text-muted">NGN {order.amount}</span>
        </div>
        <NavLink to={`/orders/${order._id}`}>
          <button className="primary-btn-inverse custom-btn-sm m-1">
            Track Order
          </button>
        </NavLink>
        {user._id === order.seller && (
          <button
            className="primary-btn custom-btn-sm m-1"
            onClick={() => dispatch(updateOrder(order._id, { status: "sent" }))}
          >
            Package Dispatched
          </button>
        )}
        {user._id === order.buyer && (
          <button
            className="primary-btn custom-btn-sm m-1"
            onClick={() =>
              dispatch(updateOrder(order._id, { status: "received" }))
            }
          >
            Package Recieved
          </button>
        )}
      </div>
    );
  };

  return (
    <div id="ordersPage" className="container mb-5">
      <div className="my-3 d-flex align-items-center">
        <div
          className="shadow-small p-3 bg-white rounded-pill back-arrow"
          onClick={() => props.history.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span className="link-large mx-3">My orders</span>
      </div>

      {loadingOrders && (
        <div className="my-2 card-body border rounded rounded-4 text-center">
          <div className="loader"></div>
          <div className="text-small">Loading your orders</div>
        </div>
      )}
      {!loadingOrders && orders.length === 0 && (
        <div className="my-2 card-body border rounded rounded-4 text-center">
          <span className="text-small">There is no item in your orders</span>
        </div>
      )}
      {orders.map((order, index) => (
        <OrderItem order={order} key={index} />
      ))}
    </div>
  );
};

export default OrdersPage;
