/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "themes",
  initialState: {
    list: [],
    theme: null,
    themes: [],
    myThemes: [],
    updatingTheme: false,
    updatingThemeStatus: "pending",
    updatingThemeError: "",
    deletingTheme: false,
    deletingThemeStatus: "pending",
    deletingThemeError: "",
    addingMyTheme: false,
    addingMyThemeStatus: "pending",
    addingMyThemeError: "",
    newTheme: {},
    themeToEdit: null,
  },
  reducers: {
    changeInput: (themes, action) => {
      themes[action.payload.name] = action.payload.value;
    },
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
    updateThemeStarted: (themes, action) => {
      themes.updatingTheme = true;
      themes.updatingThemeStatus = "pending";
      themes.updatingThemeError = "";
    },
    updateThemeSuccess: (themes, action) => {
      const updatedThemeIndex = themes.myThemes.findIndex(
        (item) => item._id === action.payload._id
      );
      themes.myThemes.splice(updatedThemeIndex, 1, action.payload);
      themes.updatingTheme = false;
      themes.updatingThemeStatus = "success";
      themes.updatingThemeError = "";
    },

    updateThemeFailed: (themes, action) => {
      themes.updatingTheme = false;
      themes.updatingThemeStatus = "failed";
      themes.updatingThemeError = action.payload.response.data.error;
    },
    deleteThemeStarted: (themes, action) => {
      themes.deletingTheme = true;
      themes.deletingThemeStatus = "pending";
      themes.deletingThemeError = "";
    },
    deleteThemeSuccess: (themes, action) => {
      themes.myThemes.pop((item) => item._id !== action.payload._id);
      themes.deletingTheme = false;
      themes.deletingThemeStatus = "success";
      themes.newTheme = action.payload;
      themes.deletingThemeError = "";
    },

    deleteThemeFailed: (themes, action) => {
      themes.deletingTheme = false;
      themes.deletingThemeStatus = "failed";
      themes.deletingThemeError = action.payload.response.data.error;
    },
    addThemeStarted: (themes, action) => {
      themes.addingMyTheme = true;
      themes.addingMyThemeStatus = "pending";
      themes.addingMyThemeError = "";
    },
    addThemeSuccess: (themes, action) => {
      themes.myThemes = [...themes.myThemes, action.payload];
      themes.addingMyTheme = false;
      themes.addingMyThemeStatus = "success";
      themes.newTheme = action.payload;
      themes.addingMyThemeError = "";
    },

    addThemeFailed: (themes, action) => {
      themes.addingMyTheme = false;
      themes.addingMyThemeStatus = "failed";
      themes.addingMyThemeError = action.payload.response.data.error;
    },
    myThemesRequested: (themes, action) => {
      themes.loading = true;
    },
    myThemesReceived: (themes, action) => {
      themes.myThemes = action.payload;
      themes.loading = false;
    },

    myThemesRequestFailed: (themes, action) => {
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
  changeInput,
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
  myThemesReceived,
  myThemesRequestFailed,
  myThemesRequested,
  addThemeFailed,
  addThemeStarted,
  addThemeSuccess,
  deleteThemeFailed,
  deleteThemeStarted,
  deleteThemeSuccess,
  updateThemeFailed,
  updateThemeStarted,
  updateThemeSuccess,
} = slice.actions;

export default slice.reducer;

export const changeThemesInput = (name, value) => (dispatch) => {
  dispatch({ type: changeInput.type, payload: { name, value } });
};
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
export const updateTheme = (id, data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/themes/${id}`,
      method: "patch",
      data,
      onStart: updateThemeStarted.type,
      onSuccess: updateThemeSuccess.type,
      onError: updateThemeFailed.type,
    })
  );
};
export const deleteTheme = (id) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/themes/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      // params: params,
      onStart: deleteThemeStarted.type,
      onSuccess: deleteThemeSuccess.type,
      onError: deleteThemeFailed.type,
    })
  );
};
export const loadMyThemes = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/themes/my-themes",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      // params: params,
      onStart: myThemesRequested.type,
      onSuccess: myThemesReceived.type,
      onError: myThemesRequestFailed.type,
    })
  );
};
export const addMyTheme = (data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/themes/add-my-theme",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      data,
      method: "post",
      onStart: addThemeStarted.type,
      onSuccess: addThemeSuccess.type,
      onError: addThemeFailed.type,
    })
  );
};

export const themes = (state) => state.app.themes.list;
export const userthemes = (state) => state.app.themes.themes;
export const theme = (state) => state.app.themes.theme;
export const loadingtheme = (state) => state.app.themes.loading;
