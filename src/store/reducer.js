import { combineReducers } from "redux";
import usersReducer from "./userSlice";
import userReducer from "./authSlice";
import highlightReducer from "./highlightSlice";
import customLinkReducer from "./customLinkSlice";
import socialMediaSampleReducer from "./sociaMediaSampleSlice";

export default combineReducers({
  highlights: highlightReducer,
  users: usersReducer,
  user: userReducer,
  socialMediaSamples: socialMediaSampleReducer,
  customLinks: customLinkReducer,
});
