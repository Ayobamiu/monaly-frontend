import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.png";
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
          <img src={monaly_logo} alt="" className="mb-32" />
        </Link>
        <p className="custom-p mb-48">
          Welcome Back, Let’s get back to creating links.
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
          <div className="remember-password mt-16 mb-48">
            <img src={Checkbox} alt="" className="mr-8" />
            <p className="action-p m-0">Remember password</p>
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
          Forgot your password?&nbsp;
          <Link to="/start-reset-password">Click to reset</Link>
        </p>
        <p className="action-p mb-32">
          Don’t have an account?&nbsp;
          <Link to="/sign-up" className="monaly-primary">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
