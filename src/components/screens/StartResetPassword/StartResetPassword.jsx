import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.png";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInUser,
  startResetloading,
  startResetstatus,
  initializePasswordReset,
} from "../../../store/authSlice";

const StartResetPassword = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);
  const [resetButtonLabel, setResetButtonLabel] = useState("Start reset");

  if (loggedInUser) {
    window.location = "/";
  }
  const loadingUser = useSelector(startResetloading);
  const userStatus = useSelector(startResetstatus);
  useEffect(() => {
    if (userStatus && userStatus.status === "success") {
      setResetButtonLabel("Resend link");
    }
  }, [userStatus]);
  const [email, setEmail] = useState(null);
  const handleInitializeReset = (e) => {
    e.preventDefault();
    dispatch(initializePasswordReset(email));
  };
  return (
    <div id="signinpage">
      <div className="form-box">
        <Link to="/">
          <img src={monaly_logo} alt="" className="mb-32" />
        </Link>
        <p className="custom-p mb-48">
          Don’t panic, we will get you back your password
        </p>
        <form action="sign-in" onSubmit={handleInitializeReset}>
          <div className="mb-48">
            <CustomInput
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              required={true}
              id="email"
            />
            <p className="small-p mb-48">
              A reset password link will be sent to your email to complete the
              reset password.
            </p>
          </div>

          <button className="primary-btn mb-16" type="submit">
            {!loadingUser ? (
              resetButtonLabel
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
      </div>
    </div>
  );
};

export default StartResetPassword;
