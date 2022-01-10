/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../store/authSlice";

export default function MonalyThemes() {
  const themes = useSelector((state) => state.app.themes.list);
  const userProfile = useSelector((state) => state.app.user.profile);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Monaly Themes</h2>
      <div className='appearance-box'>
        {themes.length === 0 && (
          <div className='no-visitors-details'>
            <h2>Nothing here yet</h2>
            <p className='custom-p'>
              You will see list of themes to select here
            </p>
          </div>
        )}
        <div className='style-items'>
          {themes.map((theme) => (
            <label className='style-item ' htmlFor={theme._id}>
              <input
                type='radio'
                name='themeSelect'
                id={theme._id}
                value={theme._id}
                checked={
                  userProfile.theme && userProfile.theme._id === theme._id
                }
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(updateUserProfile({ theme: e.target.value }));
                }}
              />
              <span class='checkmark'></span>
              <div class='input-container '>{theme.name}</div>
              <div
                className='phone theme-item-one'
                // style={{
                //   // backgroundImage: `url("https://via.placeholder.com/500")`,
                //   backgroundImage: `url(${theme.backgroundImage})`,
                // }}
              >
                <div
                  className={`bg-image f${theme.blur}`}
                  style={{
                    background: theme.backgroundImage
                      ? `linear-gradient(270deg, rgba(0, 0, 0, ${theme.dark}) 0%, rgba(0, 0, 0, ${theme.dark}) 100%),url('${theme.backgroundImage}')`
                      : theme.backgroundColorImageReplace,
                  }}></div>
                <div
                  className='phone-stack'
                  style={{
                    backgroundColor: theme.backgroundColor,
                  }}></div>
                <div
                  className='phone-stack'
                  style={{
                    backgroundColor: theme.backgroundColor,
                  }}></div>
                <div
                  className='phone-stack'
                  style={{
                    backgroundColor: theme.backgroundColor,
                  }}></div>
                <div
                  className='phone-stack'
                  style={{
                    backgroundColor: theme.backgroundColor,
                  }}></div>
                <div
                  className='phone-stack'
                  style={{
                    backgroundColor: theme.backgroundColor,
                  }}></div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
