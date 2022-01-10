/** @format */

import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addsocialMedia,
  socialMediaSamples,
  userSocials,
} from "../../../store/sociaMediaSampleSlice";

export default function SocialMediaSettings() {
  const ReUsableSocialInput = ({
    onChange,
    placeholder,
    title,
    defaultValue,
    name,
  }) => {
    const [value, setValue] = useState("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (value === defaultValue) {
            message.warning("No changes made!");
          } else {
            onChange(value);
          }
        }}
        className='my-2'>
        <label className='text-medium'>{placeholder}</label>
        <input
          type='url'
          placeholder={placeholder}
          required
          className='add-profile-title is-valid'
          title={title}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => {
            e.preventDefault();
            // validate(e.target.value);
            // onChange(e);
            setValue(e.target.value);
          }}
          onBlur={(e) => {
            if (e.target.value.length > 0) {
            }
          }}
        />
        <input
          type='submit'
          value='Update'
          className='primary-btn-inverse custom-btn-sm'
        />
      </form>
    );
  };
  const socialLoading = useSelector(
    (state) => state.app.socialMediaSamples.loading
  );
  const currentSocialMediaSamples = useSelector(socialMediaSamples);
  const currentUserSocials = useSelector(userSocials);

  const dispatch = useDispatch();
  const getSocialAvailable = (id) => {
    let result = null;
    const resultSocial = currentUserSocials.find(
      (social) =>
        social.mediaPlatformSample && social.mediaPlatformSample._id === id
    );
    result = resultSocial;

    return result;
  };
  return (
    <div>
      <h2>
        Social media handles {socialLoading && <div className='loader'></div>}{" "}
      </h2>
      <div className='appearance-box'>
        {currentSocialMediaSamples.map((item) => (
          <>
            <ReUsableSocialInput
              onChange={(value) => {
                const dataToSubmit = {
                  mediaPlatformSample: item._id,
                  link: value,
                };
                dispatch(addsocialMedia(dataToSubmit));
              }}
              defaultValue={
                getSocialAvailable(item._id) &&
                getSocialAvailable(item._id).link
              }
              placeholder={`${item.name} URL`}
            />
          </>
        ))}

        {currentSocialMediaSamples.length === 0 && (
          <div className='no-visitors-details'>
            <h2>Nothing here yet</h2>
            <p className='custom-p'>
              You will see forms to add social media links here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
