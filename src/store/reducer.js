import { combineReducers } from "redux";
import usersReducer from "./userSlice";
import userReducer from "./authSlice";
import highlightReducer from "./highlightSlice";

export default combineReducers({
  highlights: highlightReducer,
  users: usersReducer,
  user: userReducer,
});
