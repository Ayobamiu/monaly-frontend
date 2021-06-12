import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoggedInUser, logUserOut } from "../../../store/authSlice";
import "./css/style.css";

const HomePage = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  return (
    <div className="container mt-30">
      <div className="card">
        <div className="card-header">Monaly App</div>
        <div className="card-body">
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            {!loggedInUser && (
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            )}
            {!loggedInUser && (
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            )}
            {loggedInUser && (
              <li>You are logged in as {loggedInUser.user.email}</li>
            )}
            {loggedInUser && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {loggedInUser && (
              <li>
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(logUserOut())}
                >
                  Click here to logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
