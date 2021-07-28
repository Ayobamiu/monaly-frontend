import {
  faArrowLeft,
  faShoppingCart,
  faTimes,
  faCheck,
  faProcedures,
  faMedal,
  faCar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLoggedInUser } from "../../../store/authSlice";
import { loadOrder, updateOrder } from "../../../store/productSlice";
import BackButton from "../BackButton/BackButton";
import "./css/style.css";

const TrackSingleOrder = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrder(props.match.params.orderId));
    dispatch(loadLoggedInUser());
  }, []);
  const order = useSelector((state) => state.app.products.order);
  const user = useSelector((state) => state.app.user.profile);
  console.log("user", user);
  console.log("order", order);
  const OrderStage = ({ icon, text, checked, inProgress }) => {
    return (
      <div className="d-flex justify-content-between align-items-center my-3 bg-light p-3 rounded-pill">
        <FontAwesomeIcon
          icon={icon}
          className={`${checked && "text-success"} ${
            inProgress && "text-warning"
          }`}
        />
        <span
          className={`text-medium mx-3  ${checked && "text-success"} ${
            inProgress && "text-warning"
          }`}
        >
          {text}
        </span>
        <FontAwesomeIcon
          icon={faCheck}
          className={`ms-auto ${checked && "text-success"} ${
            inProgress && "text-warning"
          }`}
        />
      </div>
    );
  };

  return (
    <div id="trackSingleOrder" className="container mb-5">
      <div className="my-3">
        <div
          className="shadow-small p-3 bg-white rounded-pill back-arrow"
          onClick={() => props.history.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </div>
      <div className="link-medium my-2">
        Tracking Order No:{" "}
        <span className="text-muted text-medium">772683135914gjdg68et871</span>
      </div>
      <div className="link-medium my-2">
        Shipped By: <span className="text-muted text-medium">UPS Ground</span>
      </div>
      <div className="link-medium my-2">
        Expected Day:{" "}
        <span className="text-muted text-medium">Sep 21, 2021</span>
      </div>

      {user._id === order.seller && (
        <div className="my-2 card-body border rounded rounded-4">
          <small className="text-x-small text-success">For Seller</small>
          <p className="text-small">
            Please click on the dispatched button after you have handed over the
            package to delivery merchant
          </p>
          <button
            className="primary-btn custom-btn-sm"
            onClick={() => dispatch(updateOrder(order._id, { status: "sent" }))}
          >
            Dispatched
          </button>
        </div>
      )}
      {user._id === order.buyer && (
        <div className="my-2 card-body border rounded rounded-4">
          <small className="text-x-small text-success">For Buyer</small>
          <p className="text-small">
            Please click on the Recieved button after you have retrieved the
            package from delivery merchant
          </p>
          <button
            className="primary-btn custom-btn-sm"
            onClick={() =>
              dispatch(updateOrder(order._id, { status: "received" }))
            }
          >
            Recieved
          </button>
        </div>
      )}
      <div className="my-3">
        <div className="display-small text-muted my-3">
          Shipping Status:
          <span className="text-x-small mx-2 text-success status-item">
            Done
          </span>
          <span className="text-x-small mx-2 text-warning status-item">
            In Progress
          </span>
          <span className="text-x-small mx-2 status-item">Pending</span>
        </div>

        <OrderStage
          icon={faShoppingCart}
          text="Confirmed Order"
          checked={
            order.status === "started" ||
            order.status === "sent" ||
            order.status === "received" ||
            order.status === "cancelled" ||
            order.status === "rejected" ||
            order.status === "completed"
          }
        />
        <OrderStage
          icon={faProcedures}
          text="Processing Order"
          checked={
            order.status === "started" ||
            order.status === "sent" ||
            order.status === "received" ||
            order.status === "cancelled" ||
            order.status === "rejected" ||
            order.status === "completed"
          }
          inProgress={order.status === "started"}
        />
        <OrderStage
          icon={faMedal}
          text="Quality Check"
          checked={
            order.status === "sent" ||
            order.status === "received" ||
            order.status === "cancelled" ||
            order.status === "rejected" ||
            order.status === "completed"
          }
          inProgress={order.status === "started"}
        />
        <OrderStage
          icon={faCar}
          text="Product Dispatched"
          checked={
            order.status === "sent" ||
            order.status === "received" ||
            order.status === "cancelled" ||
            order.status === "rejected" ||
            order.status === "completed"
          }
          inProgress={order.status === "sent"}
        />
        <OrderStage
          icon={faHome}
          text="Product Delivered"
          checked={order.status === "received" || order.status === "completed"}
        />
      </div>
    </div>
  );
};

export default TrackSingleOrder;
