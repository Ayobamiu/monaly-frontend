import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../middlewares/apis";
import appReducer from "../reducer";

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["api/CallBegan"],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        // ignoredPaths: ["items.dates"],
      },
    }),
    api,
  ],
});
