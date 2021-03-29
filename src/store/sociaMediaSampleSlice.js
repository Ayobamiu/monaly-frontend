import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import memoize from "lodash.memoize";

const slice = createSlice({
  name: "socialMediaSamples",
  initialState: { list: [], socialMediaSample: {}, socials: [] },
  reducers: {
    socialMediaSamplesRequested: (socialMediaSamples, action) => {
      socialMediaSamples.loading = true;
    },
    socialMediaSamplesReceived: (socialMediaSamples, action) => {
      socialMediaSamples.list = action.payload;
      socialMediaSamples.loading = false;
    },
    userSocialsReceived: (socialMediaSamples, action) => {
      socialMediaSamples.socials = action.payload;
      socialMediaSamples.loading = false;
    },
    socialMediaSamplesRequestFailed: (socialMediaSamples, action) => {
      socialMediaSamples.loading = false;
    },
    socialMediaSampleRequested: (socialMediaSamples, action) => {
      socialMediaSamples.loading = true;
    },
    socialMediaSampleReceived: (socialMediaSamples, action) => {
      socialMediaSamples.socialMediaSample = action.payload;
      socialMediaSamples.loading = false;
    },
    socialMediaSampleRequestFailed: (socialMediaSamples, action) => {
      socialMediaSamples.loading = false;
    },
    socialMediaSampleAddStart: (socialMediaSamples, action) => {
      socialMediaSamples.loading = true;
      socialMediaSamples.status = "loading";
    },
    socialMediaSampleAdded: (socialMediaSamples, action) => {
      socialMediaSamples.list.push(action.payload);
      socialMediaSamples.loading = false;
      socialMediaSamples.status = "Added successfully";
    },
    userSocialAdded: (socialMediaSamples, action) => {
      socialMediaSamples.socials.push(action.payload);
      socialMediaSamples.loading = false;
      socialMediaSamples.status = "Added successfully";
      window.location.reload();
    },
    socialMediaSampleAddFailed: (socialMediaSamples, action) => {
      socialMediaSamples.loading = false;
      socialMediaSamples.status = "Failed";
    },
    socialMediaSampleRemoved: (socialMediaSamples, action) => {
      socialMediaSamples.list.pop(
        (socialMediaSample) => socialMediaSample._id !== action.payload._id
      );
    },
  },
});

export const {
  socialMediaSampleAdded,
  socialMediaSamplesRequested,
  socialMediaSamplesReceived,
  socialMediaSamplesRequestFailed,
  socialMediaSampleRequested,
  socialMediaSampleReceived,
  socialMediaSampleRequestFailed,
  socialMediaSampleAddStart,
  socialMediaSampleAddFailed,
  socialMediaSampleRemoved,
  userSocialsReceived,
  userSocialAdded,
} = slice.actions;

export default slice.reducer;

//Action creators
export const loadsocialMediaSamples = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/socials/get-media-platform-samples",
      // params: params,
      onStart: socialMediaSamplesRequested.type,
      onSuccess: socialMediaSamplesReceived.type,
      onError: socialMediaSamplesRequestFailed.type,
    })
  );
};

export const loadUserSocials = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/socials/get-user-socials",
      // params: params,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      onStart: socialMediaSamplesRequested.type,
      onSuccess: userSocialsReceived.type,
      onError: socialMediaSamplesRequestFailed.type,
    })
  );
};

export const loadsocialMediaSample = (socialMediaSampleId) => (
  dispatch,
  getState
) => {
  dispatch(
    apiCallBegan({
      url: `/socialMediaSamples/${socialMediaSampleId}`,
      // params: params,
      onStart: socialMediaSampleRequested.type,
      onSuccess: socialMediaSampleReceived.type,
      onError: socialMediaSampleRequestFailed.type,
    })
  );
};

export const addsocialMedia = (socialMediaSample) =>
  apiCallBegan({
    url: "/socials/add",
    method: "post",
    data: socialMediaSample,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: userSocialAdded.type,
    onError: socialMediaSampleAddFailed.type,
  });

export const viewsocialMedia = (id) =>
  apiCallBegan({
    url: "/socials/" + id,
    method: "get",
    // onSuccess: socialMediaSampleRemoved.type,
  });

export const removesocialMediaSample = (id) =>
  apiCallBegan({
    url: "/socialMediaSamples/" + id,
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: socialMediaSampleRemoved.type,
  });

export const socialMediaSamples = (state) => state.app.socialMediaSamples.list;
export const userSocials = (state) => state.app.socialMediaSamples.socials;
export const socialMediaSample = (state) =>
  state.app.socialMediaSamples.socialMediaSample;
export const loadingsocialMediaSample = (state) =>
  state.app.socialMediaSamples.loading;
