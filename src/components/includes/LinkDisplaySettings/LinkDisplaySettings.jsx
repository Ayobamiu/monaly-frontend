/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../store/authSlice";

export default function LinkDisplaySettings() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.app.user.profile);

  return (
    <div>
      <h2>Link display style</h2>
      <div className='appearance-box'>
        <div className='style-items'>
          <label className='style-item' htmlFor='stackStyle'>
            <input
              type='radio'
              name='styleSelect'
              id='stackStyle'
              checked={userProfile.stackStyle === "stacked"}
              value='stacked'
              onChange={(e) => {
                e.preventDefault();
                dispatch(
                  updateUserProfile({
                    stackStyle: e.target.value,
                  })
                );
              }}
            />
            <span class='checkmark'></span>
            <div class='input-container'>Stacked</div>
            <div className='phone'>
              <div className='phone-stack'></div>
              <div className='phone-stack'></div>
              <div className='phone-stack'></div>
              <div className='phone-stack'></div>
              <div className='phone-stack'></div>
            </div>
          </label>
          <label className='style-item' htmlFor='galleryStyle'>
            <input
              type='radio'
              name='styleSelect'
              id='galleryStyle'
              value='cards'
              checked={userProfile.stackStyle === "cards"}
              onChange={(e) => {
                e.preventDefault();
                dispatch(
                  updateUserProfile({
                    stackStyle: e.target.value,
                  })
                );
              }}
            />
            <span class='checkmark'></span>
            <div class='input-container'>Gallery</div>
            <div className='phone phone-grids'>
              <div className='phone-grid'></div>
              <div className='phone-grid'></div>
              <div className='phone-grid'></div>
              <div className='phone-grid'></div>
            </div>
          </label>
          <label className='style-item' htmlFor='mixedStyle'>
            <input
              type='radio'
              name='styleSelect'
              id='mixedStyle'
              value='mixed'
              checked={userProfile.stackStyle === "mixed"}
              onChange={(e) => {
                e.preventDefault();
                dispatch(
                  updateUserProfile({
                    stackStyle: e.target.value,
                  })
                );
              }}
            />
            <span class='checkmark'></span>
            <div class='input-container'>Mixed</div>
            <div className='phone phone-mixed'>
              <div className='phone-grid'></div>
              <div className='phone-grid'></div>
              <div className='phone-stack'></div>
              <div className='phone-stack'></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
