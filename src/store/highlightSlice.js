import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "highlights",
  initialState: { list: [], highlight: {} },
  reducers: {
    highlightsRequested: (highlights, action) => {
      highlights.loading = true;
    },
    highlightsReceived: (highlights, action) => {
      highlights.list = action.payload;
      highlights.loading = false;
    },
    highlightsRequestFailed: (highlights, action) => {
      highlights.loading = false;
    },
    highlightRequested: (highlights, action) => {
      highlights.loading = true;
    },
    highlightReceived: (highlights, action) => {
      highlights.highlight = action.payload;
      highlights.loading = false;
    },
    highlightRequestFailed: (highlights, action) => {
      highlights.loading = false;
    },
    highlightAddStart: (highlights, action) => {
      highlights.loading = true;
      highlights.status = "loading";
    },
    highlightAdded: (highlights, action) => {
      highlights.list.push(action.payload);
      highlights.loading = false;
      highlights.status = "Added successfully";
    },
    highlightAddFailed: (highlights, action) => {
      highlights.loading = false;
      highlights.status = "Failed";
    },
    highlightRemoved: (highlights, action) => {
      highlights.list.pop((highlight) => highlight._id !== action.payload._id);
    },
  },
});

export const {
  highlightAdded,
  highlightsRequested,
  highlightsReceived,
  highlightsRequestFailed,
  highlightRequested,
  highlightReceived,
  highlightRequestFailed,
  highlightAddStart,
  highlightAddFailed,
  highlightRemoved,
} = slice.actions;

export default slice.reducer;

//Action creators
export const loadhighlights = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/highlights",
      // params: params,
      onStart: highlightsRequested.type,
      onSuccess: highlightsReceived.type,
      onError: highlightsRequestFailed.type,
    })
  );
};

export const loadhighlight = (highlightId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/highlights/${highlightId}`,
      // params: params,
      onStart: highlightRequested.type,
      onSuccess: highlightReceived.type,
      onError: highlightRequestFailed.type,
    })
  );
};

export const addhighlight = (highlight) =>
  apiCallBegan({
    url: "/highlights",
    method: "post",
    data: highlight,
    headers: { "content-type": "multipart/form-data" },
    onSuccess: highlightAdded.type,
    onError: highlightAddFailed.type,
  });

export const removehighlight = (id) =>
  apiCallBegan({
    url: "/highlights/" + id,
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: highlightRemoved.type,
  });

export const highlights = (state) => state.app.highlights.list;
export const highlight = (state) => state.app.highlights.highlight;
export const loadingHighlight = (state) => state.app.highlights.loading;
