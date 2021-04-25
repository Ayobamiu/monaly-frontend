import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import memoize from "lodash.memoize";

const slice = createSlice({
  name: "themes",
  initialState: { list: [], theme: null, themes: [] },
  reducers: {
    themesRequested: (themes, action) => {
      themes.loading = true;
    },
    themesReceived: (themes, action) => {
      themes.list = action.payload;
      themes.loading = false;
    },

    themesRequestFailed: (themes, action) => {
      themes.loading = false;
    },
    themeRequested: (themes, action) => {
      themes.loading = true;
    },
    themeReceived: (themes, action) => {
      themes.theme = action.payload;
      themes.loading = false;
    },
    themeRequestFailed: (themes, action) => {
      themes.loading = false;
    },
    themeAddStart: (themes, action) => {
      themes.loading = true;
      themes.status = "loading";
    },
    themeAdded: (themes, action) => {
      themes.list.push(action.payload);
      themes.loading = false;
      themes.status = "Added successfully";
    },

    themeAddFailed: (themes, action) => {
      themes.loading = false;
      themes.status = "Failed";
    },
    themeRemoved: (themes, action) => {
      themes.list.pop((theme) => theme._id !== action.payload._id);
    },
  },
});

export const {
  themeAdded,
  themesRequested,
  themesReceived,
  themesRequestFailed,
  themeRequested,
  themeReceived,
  themeRequestFailed,
  themeAddStart,
  themeAddFailed,
  themeRemoved,
} = slice.actions;

export default slice.reducer;

//Action creators
export const loadthemes = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/themes",
      // params: params,
      onStart: themesRequested.type,
      onSuccess: themesReceived.type,
      onError: themesRequestFailed.type,
    })
  );
};

export const themes = (state) => state.app.themes.list;
export const userthemes = (state) => state.app.themes.themes;
export const theme = (state) => state.app.themes.theme;
export const loadingtheme = (state) => state.app.themes.loading;
