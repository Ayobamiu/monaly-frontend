import React, { useEffect, useState } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.png";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInUser,
  resetLoading,
  resetStatus,
  passwordReset,
} from "../../../store/authSlice";

// import jwt from "jsonwebtoken";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  // const token = jwt.sign(
  //   { _id: "604ddbac2e959a001563e926", email: "ayobamiu@gmail.com" },
  //   "myjwtsecretkey",
  //   { expiresIn: "1h" }
  // );

  if (loggedInUser) {
    window.location = "/";
  }
  useEffect(() => {
    document.title = "Reset Password | Monaly";
  }, []);
  const loadingUser = useSelector(resetLoading);
  const userStatus = useSelector(resetStatus);

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(
      passwordReset(props.match.params.token, password, confirmPassword)
    );
  };
  return (
    <div id="signinpage">
      <div className="form-box">
        <Link to="/">
          <img src={monaly_logo} alt="" className="mb-32" />
        </Link>
        <p className="custom-p mb-48">Allmost done! Enter new password </p>
        <form action="sign-in" onSubmit={handleReset}>
          <div className="mb-48">
            <CustomInput
              onChange={(e) => setPassword(e.target.value)}
              secured={true}
              placeholder="Enter password"
              type="password"
              required={true}
              id="password"
            />
            <div className="mb-48">
              <CustomInput
                onChange={(e) => setConfirmPassword(e.target.value)}
                secured={true}
                placeholder="Confirm password"
                type="password"
                required={true}
                id="confirmPassword"
              />
            </div>
          </div>

          <button className="primary-btn mb-16" type="submit">
            {!loadingUser ? (
              "Reset Password"
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

export default ResetPassword;
