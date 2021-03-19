import { combineReducers } from "redux";
import usersReducer from "./userSlice";
import userReducer from "./authSlice";
import highlightReducer from "./highlightSlice";
import customLinkReducer from "./customLinkSlice";

export default combineReducers({
  highlights: highlightReducer,
  users: usersReducer,
  user: userReducer,
  customLinks: customLinkReducer,
});
