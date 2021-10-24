import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadLoggedInUser } from "../../../store/authSlice";
import BackButton from "../../includes/BackButton/BackButton";
import "./css/styles.css";

export default function Stores() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.app.user.profile);
  const loading = useSelector((state) => state.app.user.loading);
  useEffect(() => {
    dispatch(loadLoggedInUser());
  }, []);

  return (
    <div>
      <BackButton showCart={false} text="My Stores" />
      {loading && (
        <div class="loader-line">
          <div class="loader__element"></div>
        </div>
      )}
      <div className="container">
        {!loading && profile.stores.length === 0 && (
          <div className="store-item bg-white p-4 shadow-small my-2 w-100 text-center">
            <h1 className="text-small text-truncate">
              List of stores you manage will show here
            </h1>
            <NavLink to="/add-store" className="btn btn-primary">
              Add a store
            </NavLink>
          </div>
        )}
        {profile.stores.map((store) => (
          <div className="store-item bg-white p-3 shadow-small my-2 w-100">
            <h1 className="link-large text-truncate">{store.name}</h1>
            <p className="text-small text-truncate">{store.address}</p>
            <p className="text-x-small text-success text-truncate">
              {store.description}
            </p>
            <NavLink to="/add-product" className="btn btn-primary">
              Add product
            </NavLink>
            <NavLink
              to={`/store/${store.slug}`}
              className="mx-2 btn btn-primary"
            >
              View Products
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
