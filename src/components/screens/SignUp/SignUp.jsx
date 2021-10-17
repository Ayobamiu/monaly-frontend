import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loading,
  signUserUp,
  status,
  userNameloading,
  userNamestatus,
  checkUserNameAvailability,
  getLoggedInUser,
  changeAuthInput,
} from "../../../store/authSlice";

const SignUp = (props) => {
  const redirect = props.match.params.redirect;
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser) {
    window.location = "/";
  }

  useEffect(() => {
    if (redirect) {
      dispatch(changeAuthInput("redirect", redirect));
    }
    document.title = "Sign Up | Monaly";
  }, []);
  const loadingUser = useSelector(loading);
  const userStatus = useSelector(status);
  const loadingUserName = useSelector(userNameloading);
  const statusUsername = useSelector(userNamestatus);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const signUpUserName = useSelector((state) => state.app.user.signUpUserName);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUserUp(firstName, lastName, email, signUpUserName, password));
  };

  return (
    <div id="signuppage">
      <div className="form-box">
        <Link to="/">
          <img src={monaly_logo} alt="" className="mb-32 h-25-900" />
        </Link>
        <p className="header-p mb-48 mb-32-900">
          Let’s help you create an account!
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
              dispatch(changeAuthInput("signUpUserName", e.target.value));
              if (e.target.value && e.target.value.length > 0) {
                dispatch(checkUserNameAvailability(e.target.value));
              }
            }}
            placeholder="Username"
            type="text"
            required={true}
            id="userName"
            defaultValue={signUpUserName}
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
              {statusUsername && signUpUserName && (
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
          <p className="small-p mb-48 mb-32-900">
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
        </form>
        <div className="mb-32 hide-900"></div>
        {/* <button className="primary-inverse-btn mb-32">
          Sign up with Google
        </button> */}
        <p className="action-p">
          Already have an account? &nbsp;
          <Link to={`/sign-in?redirect=${redirect}`} className="dark-action-p">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
