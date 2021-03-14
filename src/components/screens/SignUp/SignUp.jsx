import React, { useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.png";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loading,
  signUserUp,
  status,
  user,
  error,
  userNameloading,
  userNamestatus,
  checkUserNameAvailability,
  getLoggedInUser,
} from "../../../store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser) {
    window.location = "/";
  }

  const currentUser = useSelector(user);
  const loadingUser = useSelector(loading);
  const userStatus = useSelector(status);
  const loadingUserName = useSelector(userNameloading);
  const statusUsername = useSelector(userNamestatus);
  const userError = useSelector(error);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUserUp(firstName, lastName, email, userName, password));
  };

  return (
    <div id="signuppage">
      <div className="form-box">
        <Link to="/">
          <img src={monaly_logo} alt="" className="mb-32" />
        </Link>
        <p className="custom-p mb-48">
          Let’s create some powerful links, Sign up to get started.
        </p>
        <form action="sign-up" onSubmit={handleSignUp}>
          <CustomInput
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            type="text"
            required={true}
            id="firstName"
          />
          <CustomInput
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            required={true}
            id="lastName"
          />
          <CustomInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            required={true}
            id="email"
          />
          <CustomInput
            onChange={(e) => {
              setUserName(e.target.value);
              if (e.target.value && e.target.value.length > 0) {
                dispatch(checkUserNameAvailability(e.target.value));
              }
            }}
            placeholder="Username"
            type="text"
            required={true}
            id="userName"
          />
          {statusUsername && (
            <div style={{ display: "flex", margin: 0 }}>
              {loadingUserName && (
                <div
                  class="spinner-border spinner-border-sm monaly-primary"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
              {statusUsername && userName && (
                <span
                  style={{
                    color: statusUsername && statusUsername.color,
                  }}
                  className="notify-p"
                >
                  &nbsp; {statusUsername && statusUsername.message}
                </span>
              )}
            </div>
          )}
          <CustomInput
            onChange={(e) => setPassword(e.target.value)}
            secured={true}
            placeholder="Enter password"
            type="password"
            required={true}
            id="password"
          />
          <p className="small-p mb-48">
            By using this service you are agreeing to the terms of service and
            privacy policy.
          </p>
          <button className="primary-btn mb-16" type="submit">
            {!loadingUser ? (
              "Sign Up"
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
        <button className="primary-inverse-btn mb-32">
          Sign up with Google
        </button>
        <p className="action-p">
          Already have an account? &nbsp;
          <Link to="/sign-in" className="monaly-primary">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
