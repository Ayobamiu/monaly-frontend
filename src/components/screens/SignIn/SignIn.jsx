import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.png";
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
          <img src={monaly_logo} alt="" />
        </Link>
        <p className="custom-p mb-30">
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
          <button className="primary-btn" type="submit">
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
              className="notify-p"
            >
              {userStatus && userStatus.message}...
            </span>
          )}
        </form>
        <button className="primary-inverse-btn">Sign in with Google</button>
        <p className="action-p mb-20">
          Forgot your password?&nbsp;
          <Link to="/sign-up">Click to reset</Link>
        </p>
        <p className="action-p mb-20">
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
