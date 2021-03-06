import { combineReducers } from "redux";
import usersReducer from "./userSlice";
import userReducer from "./authSlice";
import highlightReducer from "./highlightSlice";
import customLinkReducer from "./customLinkSlice";
import socialMediaSampleReducer from "./sociaMediaSampleSlice";
import themeReducer from "./themeSlice";
import notificationReducer from "./notificationSlice";
import productReducer from "./productSlice";

export default combineReducers({
  products: productReducer,
  notifications: notificationReducer,
  highlights: highlightReducer,
  users: usersReducer,
  user: userReducer,
  socialMediaSamples: socialMediaSampleReducer,
  themes: themeReducer,
  customLinks: customLinkReducer,
});
