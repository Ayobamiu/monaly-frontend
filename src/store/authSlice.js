import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import jwt from "jsonwebtoken";

const slice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    userName: { status: null },
    startReset: { status: null },
    reset: { status: null },
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },
    userReceived: (user, action) => {
      user.profile = action.payload;
      user.loading = false;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
    },
    checkUserNameStart: (user, action) => {
      user.userName.loading = true;
      user.userName.status = { message: "Checking username", color: "blue" };
    },
    checkUserNameSuccess: (user, action) => {
      user.userName.loading = false;
      user.userName.status = {
        message: "Username available!",
        color: "#00966d",
      };
    },
    checkUserNameFailed: (user, action) => {
      user.userName.loading = false;
      user.userName.status = { message: "Username taken", color: "#c30052" };
    },
    resetInitializeStart: (user, action) => {
      user.startReset.loading = true;
      user.startReset.status = {
        message: "Sending link to your email",
        color: "blue",
      };
    },
    resetInitializeSuccess: (user, action) => {
      user.startReset.loading = false;
      user.startReset.status = {
        message: action.payload.message,
        color: "#00966d",
        status: "success",
      };
    },
    resetInitializeFailed: (user, action) => {
      user.startReset.loading = false;
      user.startReset.status = {
        message: action.payload.response.data.error,
        color: "#c30052",
      };
    },
    resetStart: (user, action) => {
      user.reset.loading = true;
      user.reset.status = {
        message: "Changing your password ",
        color: "blue",
      };
    },
    resetSuccess: (user, action) => {
      user.reset.loading = false;
      user.reset.status = {
        message: action.payload.message,
        color: "#00966d",
      };
    },
    resetFailed: (user, action) => {
      user.reset.loading = false;
      user.reset.status = {
        message: action.payload.response.data.error,
        color: "#c30052",
      };
    },
    signUpStart: (user, action) => {
      user.loading = true;
      user.loggedIn = false;
      user.status = { message: "Signing up", color: "blue" };
    },
    signUpSuccess: (user, action) => {
      user.loading = false;
      user.loggedIn = true;
      user.profile = action.payload.user;
      user.status = { message: "Sign Up successful", color: "#00966d" };
      localStorage.setItem("authToken", action.payload.token);
    },
    signUpFailed: (user, action) => {
      user.loading = false;
      user.loggedIn = false;
      user.error = action.payload.response.data.error;
      user.status = { message: "Sign up failed", color: "#c30052" };
    },
    authStart: (user, action) => {
      user.loading = true;
      user.loggedIn = false;
      user.status = { message: "Logging in", color: "blue" };
    },
    authSuccess: (user, action) => {
      user.loading = false;
      user.loggedIn = true;
      user.profile = action.payload.user;
      user.status = { message: "Login successful", color: "#00966d" };
      localStorage.setItem("authToken", action.payload.token);
    },
    authFailed: (user, action) => {
      user.loading = false;
      user.loggedIn = false;
      user.error = action.payload;
      user.status = { message: "Login failed", color: "#c30052" };
    },
    authRemoved: (user, action) => {
      user.loggedIn = false;
      localStorage.removeItem("authToken");
      user.profile = {};
    },
  },
});

export const {
  userRequested,
  userReceived,
  userRequestFailed,
  authStart,
  authSuccess,
  authFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  authRemoved,
  checkUserNameFailed,
  checkUserNameStart,
  checkUserNameSuccess,
  resetInitializeStart,
  resetInitializeSuccess,
  resetInitializeFailed,
  resetStart,
  resetSuccess,
  resetFailed,
} = slice.actions;

export default slice.reducer;

export const checkUserNameAvailability = (userName) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/auth/check-username",
      method: "post",
      data: { userName },
      onStart: checkUserNameStart.type,
      onSuccess: checkUserNameSuccess.type,
      onError: checkUserNameFailed.type,
    })
  );
};
export const signUserUp = (firstName, lastName, email, userName, password) => (
  dispatch
) => {
  dispatch(
    apiCallBegan({
      url: "/auth/sign-up",
      method: "post",
      data: { firstName, lastName, email, userName, password },
      onStart: signUpStart.type,
      onSuccess: signUpSuccess.type,
      onError: signUpFailed.type,
    })
  );
};
export const logUserIn = (email, password) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "auth/login",
      method: "post",
      data: { email, password },
      onStart: authStart.type,
      onSuccess: authSuccess.type,
      onError: authFailed.type,
    })
  );
};
export const initializePasswordReset = (email) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "auth/start-reset-password",
      method: "post",
      data: { email },
      onStart: resetInitializeStart.type,
      onSuccess: resetInitializeSuccess.type,
      onError: resetInitializeFailed.type,
    })
  );
};
export const passwordReset = (token, password_one, password_two) => (
  dispatch
) => {
  dispatch(
    apiCallBegan({
      url: `auth/reset-password/${token}`,
      method: "patch",
      data: { password_one, password_two },
      onStart: resetStart.type,
      onSuccess: resetSuccess.type,
      onError: resetFailed.type,
    })
  );
};
export const logUserOut = () => (dispatch) => {
  window.location = "/";
  return localStorage.removeItem("authToken");
};

export const loadLoggedInUser = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "auth/me",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const getLoggedInUser = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    var decoded = jwt.verify(token, "myjwtsecretkey");
    return decoded;
  }
  return null;
};

export const user = (state) => state.app.user.profile;
export const error = (state) => state.app.user.error;
export const status = (state) => state.app.user.status;
export const loading = (state) => state.app.user.loading;
export const userNamestatus = (state) => state.app.user.userName.status;
export const userNameloading = (state) => state.app.user.userName.loading;
export const startResetstatus = (state) => state.app.user.startReset.status;
export const startResetloading = (state) => state.app.user.startReset.loading;
export const resetStatus = (state) => state.app.user.reset.status;
export const resetLoading = (state) => state.app.user.reset.loading;
