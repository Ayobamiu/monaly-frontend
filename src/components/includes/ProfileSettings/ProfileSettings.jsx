/** @format */

import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfilePhoto,
  getLoggedInUser,
  updateUserProfile,
  uploadUserPhotos,
} from "../../../store/authSlice";
import AppButton from "../AppButton/AppButton";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.app.user.profile);
  const currentUser = getLoggedInUser();

  const initialsOnProfile =
    currentUser &&
    currentUser.firstName &&
    currentUser.firstName.slice(0, 2).toUpperCase();
  const [profileTitle, setProfileTitle] = useState(userProfile.profileTitle);
  const [bio, setBio] = useState(userProfile.bio);
  const targetTextarea = document.querySelector("textarea");
  const targetTextareaLength =
    targetTextarea && targetTextarea.value && targetTextarea.value.length;
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const handleChange = (info) => {
    const newFormData = new FormData();
    newFormData.append("profilePhoto", info.file.originFileObj);
    dispatch(uploadUserPhotos(newFormData));
  };
  return (
    <div>
      <h2>Profile settings</h2>
      <div className='appearance-box'>
        <div className='house-avatar'>
          {userProfile.profilePhoto ? (
            <div
              className='avatar'
              style={{ backgroundImage: `url(${userProfile.profilePhoto})` }}>
              {/* <img
                src={userProfile.profilePhoto}
                alt=''
                height='100%'
                title='Profile Photo'
              /> */}
            </div>
          ) : (
            <div className='avatar'> {initialsOnProfile}</div>
          )}
          <div className='image-btns '>
            {/* <label

              htmlFor='file-upload'
              className='cursor'
              title='Pick A Profile Photo'>
              <input
                type='file'
                name=''
                id='file-upload'
                className='custom-file-input'
                onChange={(e) => {
                  e.preventDefault();
                  const newFormData = new FormData();
                  newFormData.append("profilePhoto", e.target.files[0]);
                  dispatch(uploadUserPhotos(newFormData));
                }}
              />
              Pick an image
            </label> */}
            <ImgCrop rotate shape='round'>
              <Upload
                name='profile_image'
                listType='picture-card'
                showUploadList={false}
                onPreview={onPreview}
                onChange={handleChange}>
                <AppButton text='Pick an Image' small className='mr-2' />
              </Upload>
            </ImgCrop>
            {userProfile && userProfile.profilePhoto && (
              // <button
              //   className='primary-btn-inverse custom-btn-sm '
              //   title='Remove Profile Photo'
              //  >
              //   Remove
              // </button>
              <AppButton
                inverse
                text='Remove'
                small
                className='my-2 my-md-0'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteProfilePhoto());
                }}
              />
            )}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = {};
            if (userProfile.profileTitle !== profileTitle) {
              data.profileTitle = profileTitle;
            }
            if (userProfile.bio !== bio) {
              data.bio = bio;
            }
            if (
              userProfile.profileTitle !== profileTitle ||
              userProfile.bio !== bio
            ) {
              dispatch(
                updateUserProfile({
                  profileTitle,
                  bio,
                })
              );
            } else {
              message.warning("No changes made!");
            }
          }}>
          <input
            type='text'
            placeholder='Profile Title'
            className='add-profile-title'
            title='Change Profile Title'
            name='profileTitle'
            defaultValue={userProfile.profileTitle}
            onChange={(e) => {
              // dispatch(
              //   updateUserProfile({
              //     profileTitle: e.target.value,
              //   })
              // );
              setProfileTitle(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value.length > 0) {
              }
            }}
          />
          <textarea
            name='bio'
            id='bio'
            cols='60'
            rows='10'
            title='Change Bio'
            placeholder='Bio'
            defaultValue={userProfile.bio}
            onChange={(e) => {
              // dispatch(
              //   updateUserProfile({ bio: e.target.value })
              // );
              setBio(e.target.value);
            }}
            maxLength='80'></textarea>
          <div className='textarea-count'>
            <span>{targetTextareaLength || 0}/80</span>
          </div>
          <input
            type='submit'
            value='Update'
            className='primary-btn-inverse custom-btn-sm'
          />
        </form>
      </div>
    </div>
  );
}
