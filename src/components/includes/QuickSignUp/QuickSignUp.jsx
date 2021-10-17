import React, { useState } from "react";
import "./css/style.css";
import StepWizard from "react-step-wizard";
import { useDispatch, useSelector } from "react-redux";
import { changeAuthInput, signUserUp } from "../../../store/authSlice";

const QuickSignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpUserName = useSelector((state) => state.app.user.signUpUserName);
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUserUp(firstName, lastName, email, signUpUserName, password));
  };
  const FormOne = (props) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.nextStep();
          }}
        >
          <label htmlFor="emailAddress" className="text-medium">
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            className="form-control form-control-lg my-3"
            placeholder="Email Address"
            required
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />

          <input
            type="submit"
            value="Continue"
            className="form-control form-control-lg my-3 btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  };
  const FormTwo = (props) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.nextStep();
          }}
        >
          <label htmlFor="userName" className="text-medium">
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="form-control form-control-lg my-3"
            placeholder="Username"
            required
            onChange={(e) =>
              dispatch(changeAuthInput("signUpUserName", e.target.value))
            }
          />

          <input
            type="submit"
            value="Continue"
            className="form-control form-control-lg my-3 btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  };
  const FormThree = (props) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.nextStep();
          }}
        >
          <label htmlFor="firstName" className="text-medium">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control form-control-lg my-3"
            placeholder="Your First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName" className="text-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-control form-control-lg my-3"
            placeholder="Your Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="submit"
            value="Continue"
            className="form-control form-control-lg my-3 btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  };
  const FormFour = (props) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <label htmlFor="password" className="text-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control form-control-lg my-3"
            placeholder="Password"
            required
          />

          <input
            type="submit"
            className="form-control form-control-lg my-3 btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  };
  return (
    <div id="quickSignUp" className="bg-light p-3 rounded">
      <p className="link-medium">Quick Sign Up</p>
      <StepWizard>
        <FormOne />
        <FormTwo />
        <FormThree />
        <FormFour />
      </StepWizard>
    </div>
  );
};

export default QuickSignUp;
