import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import Checkbox from "../../../assets/images/Checkbox.png";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInUser,
  loading,
  logUserIn,
  status,
} from "../../../store/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser) {
    window.location = "/";
  }
  const loadingUser = useSelector(loading);
  const userStatus = useSelector(status);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(logUserIn(email, password));
  };
  return (
    <div id="signinpage">
      <div className="form-box">
        <Link to="/">
          <img src={monaly_logo} alt="" className="mb-32 h-25-900"  />
        </Link>
        <p className="header-p mb-48 mb-32-900">
          Login in to your monaly account!
        </p>
        <form action="sign-in" onSubmit={handleSignIn}>
          <CustomInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            required={true}
            id="email"
          />
          <CustomInput
            onChange={(e) => setPassword(e.target.value)}
            secured={true}
            placeholder="Enter password"
            type="password"
            required={true}
            id="password"
          />
          <div className="remember-password mt-16 mb-48 mb-32-900">
            <img src={Checkbox} alt="" className="mr-8" />
            <p className="action-p m-0">Remember me</p>
          </div>
          <button className="primary-btn mb-16" type="submit">
            {!loadingUser ? (
              "Sign In"
            ) : (
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
          {userStatus && (
            <span
              style={{
                color: userStatus && userStatus.color,
              }}
              className="notify-p mb-8"
            >
              {userStatus && userStatus.message}...
            </span>
          )}
        </form>
        <div className="mb-32"></div>
        {/* <button className="primary-inverse-btn mb-32">
          Sign in with Google
        </button> */}
        <p className="action-p mb-32">
          <Link to="/start-reset-password" className="custom-p">
            <u>Forgot your password?</u>
          </Link>
        </p>
        <p className="action-p mb-32">
          Don’t have an account?&nbsp;
          <Link to="/sign-up" className="dark-action-p">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
