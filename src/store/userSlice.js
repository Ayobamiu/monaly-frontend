import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import memoize from "lodash.memoize";
import { apiCallBegan } from "./api";
import { logUserIn } from "./authSlice";

const slice = createSlice({
  name: "users",
  initialState: { list: [] },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
    },

    userAdded: (users, action) => {
      users.list.push(action.payload.user);
      localStorage.setItem("authToken", action.payload.token);
      logUserIn(action.payload.user.email, action.payload.user.password);
      users.status = { message: "Sign Up Success", color: "green" };
    },

    userAddFailed: (users, action) => {
      users.status = {
        message: action.payload.response.data.error,
        color: "red",
      };
    },
    userRemoved: (users, action) => {
      users.list.pop((user) => user._id !== action.payload._id);
    },
  },
});

export const {
  userAdded,
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userRemoved,
  userAddFailed,
} = slice.actions;

export default slice.reducer;

//Action creators
export const loadUsers = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/auth/users",
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const addUser = (user) =>
  apiCallBegan({
    url: "/users",
    method: "post",
    data: user,
    onSuccess: userAdded.type,
    onError: userAddFailed.type,
  });

export const removeUser = () =>
  apiCallBegan({
    url: "/users/me",
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: userRemoved.type,
  });

export const getUserById = createSelector(
  (state) => state.app.users,
  (users) => memoize((id) => users.filter((user) => user._id === id))
);
