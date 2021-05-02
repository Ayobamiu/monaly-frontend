import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import memoize from "lodash.memoize";

const slice = createSlice({
  name: "customLinks",
  initialState: { list: [], customLink: {}, focusedLinkId: "", statistics: {} },
  reducers: {
    statisticsRequested: (customLinks, action) => {
      customLinks.focusedLinkId = action.payload;
      customLinks.loading = true;
    },
    statisticsReceived: (customLinks, action) => {
      customLinks.statistics = action.payload;
      customLinks.loading = false;
    },
    requestStatisticsFailed: (customLinks, action) => {
      customLinks.loading = false;
    },
    changeFocusedLinkId: (customLinks, action) => {
      customLinks.focusedLinkId = action.payload;
    },
    customLinksRequested: (customLinks, action) => {
      customLinks.loading = true;
    },
    customLinksReceived: (customLinks, action) => {
      customLinks.list = action.payload.customLinks;
      customLinks.loading = false;
    },
    customLinksRequestFailed: (customLinks, action) => {
      customLinks.loading = false;
      customLinks.error = action.payload;
    },
    customLinkRequested: (customLinks, action) => {
      customLinks.loading = true;
    },
    customLinkReceived: (customLinks, action) => {
      customLinks.customLink = action.payload;
      customLinks.loading = false;
    },
    customLinkRequestFailed: (customLinks, action) => {
      customLinks.loading = false;
    },
    customLinkAddStart: (customLinks, action) => {
      customLinks.loadingUpdate = true;
      customLinks.status = "loading";
    },
    customLinkAdded: (customLinks, action) => {
      customLinks.list.unshift(action.payload);
      customLinks.loadingUpdate = false;
      customLinks.status = "Added successfully";
      // window.location.reload();
    },
    customLinkAddFailed: (customLinks, action) => {
      customLinks.loadingUpdate = false;
      customLinks.status = "Failed";
    },
    customLinkUpdateStart: (customLinks, action) => {
      customLinks.loadingUpdate = true;
      customLinks.status = "loading";
    },
    customLinkUpdated: (customLinks, action) => {
      const index = customLinks.list.findIndex(
        (item) => item._id === action.payload.customLink._id
      );
      customLinks.list[index].link = action.payload.customLink.link;
      customLinks.list[index].title = action.payload.customLink.title;
      customLinks.list[index].visible = action.payload.customLink.visible;
      customLinks.list[index].image = action.payload.customLink.image;
      customLinks.loadingUpdate = false;
      customLinks.status = "Updated successfully";
      // window.location.reload();
    },
    customLinkUpdateFailed: (customLinks, action) => {
      customLinks.loadingUpdate = false;
      customLinks.status = "Failed";
    },
    customLinkRemoveStart: (customLinks, action) => {
      customLinks.loadingUpdate = true;
      customLinks.status = "Failed";
    },
    customLinkRemoved: (customLinks, action) => {
      customLinks.list.pop(
        (customLink) => customLink._id !== action.payload._id
      );
      customLinks.loadingUpdate = false;
      window.location.reload();
    },
    customLinkRemoveFailed: (customLinks, action) => {
      customLinks.loadingUpdate = false;
    },
  },
});

export const {
  customLinkAdded,
  customLinksRequested,
  customLinksReceived,
  customLinksRequestFailed,
  customLinkRequested,
  customLinkReceived,
  customLinkRequestFailed,
  customLinkAddStart,
  customLinkAddFailed,
  customLinkRemoved,
  customLinkUpdateStart,
  customLinkUpdated,
  customLinkUpdateFailed,
  changeFocusedLinkId,
  statisticsRequested,
  statisticsReceived,
  requestStatisticsFailed,
} = slice.actions;

export default slice.reducer;

//Action creators
export const ChangefocusedLinkId = (focusedLinkId) => (dispatch, getState) => {
  dispatch(changeFocusedLinkId(focusedLinkId));
};
//Action creators
export const loadcustomLinks = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/custom-links",
      // params: params,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      onStart: customLinksRequested.type,
      onSuccess: customLinksReceived.type,
      onError: customLinksRequestFailed.type,
    })
  );
};

export const loadcustomLink = (customLinkId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/custom-links/${customLinkId}`,
      // params: params,
      onStart: customLinkRequested.type,
      onSuccess: customLinkReceived.type,
      onError: customLinkRequestFailed.type,
    })
  );
};

export const addcustomLink = (customLink) =>
  apiCallBegan({
    url: "/custom-links/add",
    method: "post",
    data: customLink,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onStart: customLinkAddStart.type,
    onSuccess: customLinkAdded.type,
    onError: customLinkAddFailed.type,
  });

export const viewCustomLink = (id) =>
  apiCallBegan({
    url: "/custom-links/" + id,
    method: "get",
  });

export const removecustomLink = (customLinkId) =>
  apiCallBegan({
    url: "/custom-links/" + customLinkId,
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: customLinkRemoved.type,
  });

export const updateCustomLink = (customLinkId, customLink) =>
  apiCallBegan({
    url: "/custom-links/" + customLinkId,
    method: "patch",
    data: customLink,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onStart: customLinkUpdateStart.type,
    onSuccess: customLinkUpdated.type,
    onError: customLinkUpdateFailed.type,
  });
export const getStatistics = () =>
  apiCallBegan({
    url: "/custom-links/counts",
    method: "get",
    onStart: statisticsRequested.type,
    onSuccess: statisticsReceived.type,
    onError: requestStatisticsFailed.type,
  });

export const customLinks = (state) => state.app.customLinks.list;
export const customLink = (state) => state.app.customLinks.customLink;
export const loadingUpdateCustomLinks = (state) =>
  state.app.customLinks.loadingUpdate;
export const loadingcustomLinks = (state) => state.app.customLinks.loading;
export const customLinksError = (state) => state.app.customLinks.error;
export const focusedLinkId = (state) => state.app.customLinks.focusedLinkId;
