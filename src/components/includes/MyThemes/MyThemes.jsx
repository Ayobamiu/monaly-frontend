/** @format */

import {
  faLock,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateUserProfile } from "../../../store/authSlice";
import RenameTheme from "../AddNewTheme/RenameTheme";
import "./style.css";
import { changeThemesInput, deleteTheme } from "../../../store/themeSlice";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import { changeCustomLinkInput } from "../../../store/customLinkSlice";
export default function MyThemes() {
  const dispatch = useDispatch();
  const deletingTheme = useSelector((state) => state.app.themes.deletingTheme);
  const deletingThemeStatus = useSelector(
    (state) => state.app.themes.deletingThemeStatus
  );
  const deletingThemeError = useSelector(
    (state) => state.app.themes.deletingThemeError
  );
  const myThemes = useSelector((state) => state.app.themes.myThemes);
  const userProfile = useSelector((state) => state.app.user.profile);
  const subscription = useSelector((state) => state.app.user.subscription);
  const isSubscribed = subscription && subscription.status === "active";
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    if (deletingThemeStatus === "success") {
      message.success("Theme deleted!");
      if (selectedTheme._id === userProfile.theme._id) {
        window.location.reload();
      }
    }
    if (deletingThemeStatus === "failed") {
      message.error(deletingThemeError || "Error deleting theme!");
    }
    dispatch(changeThemesInput("deletingThemeStatus", "pending"));
  }, [
    deletingThemeStatus,
    deletingThemeError,
    dispatch,
    userProfile.theme?._id,
    selectedTheme?._id,
  ]);

  const setUpEditThemePage = (data) => {
    dispatch(
      changeCustomLinkInput("testBackgroundImage", data.backgroundImage)
    );
    dispatch(changeCustomLinkInput("testThemeName", data.name));
    dispatch(changeCustomLinkInput("testBackgroundBlur", data.blured));
    dispatch(changeCustomLinkInput("testLinkColor", data.backgroundColor));
    dispatch(
      changeCustomLinkInput(
        "testBackgroundColor",
        data.backgroundColorImageReplace
      )
    );
    dispatch(changeCustomLinkInput("testTextColor", data.color));
    dispatch(changeCustomLinkInput("testBlurPercent", data.blur));
    dispatch(changeCustomLinkInput("testDarkPercent", data.dark));
  };

  return (
    <div id='myThemes'>
      <h2>Custom Themes</h2>
      <div className='appearance-box '>
        {!isSubscribed && (
          <div className='appearance-box-inactive'>
            <FontAwesomeIcon icon={faLock} size='lg' />
            <p className='text-medium mt-2'>
              Subscribe to use customized themes
            </p>
            <div>
              <SubscribeButton title='Subscribe Now' />
            </div>
          </div>
        )}
        {myThemes.length === 0 && (
          <div className='no-visitors-details'>
            <h2>Nothing here yet</h2>
            <p className='custom-p'>
              You will see list of your customized themes to select here
            </p>
          </div>
        )}
        <div className='style-items'>
          <NavLink
            to={`/dashboard/add-theme`}
            activeClassName='active'
            className=''
            //   title={title}
          >
            <div className='add-custom-theme-select'>
              <FontAwesomeIcon icon={faPlus} size='lg' color='#D6D8E7' />
              <p className='text-small '>New theme</p>
            </div>
          </NavLink>
          {myThemes.map((theme) => (
            <div className='style-item'>
              <div className='actions-box'>
                <Popconfirm
                  title='Are you sure to delete this Theme?'
                  onConfirm={() => {
                    setSelectedTheme(theme);
                    dispatch(deleteTheme(theme._id));
                  }}
                  onCancel={() => {}}
                  okText='Yes'
                  cancelText='No'>
                  {deletingTheme && selectedTheme._id === theme._id ? (
                    <Spin size='small' spinning={deletingTheme} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash}
                      size='lg'
                      color='white'
                      className='cursor'
                    />
                  )}
                </Popconfirm>
                <NavLink to='/dashboard/edit-theme'>
                  <FontAwesomeIcon
                    icon={faPen}
                    size='lg'
                    color='white'
                    onClick={() => {
                      setUpEditThemePage(theme);
                      setSelectedTheme(theme);
                      // setShowEditPanel(true);
                      dispatch(changeThemesInput("themeToEdit", theme));
                      // setTimeout(() => {
                      //   window.location = "/dashboard/edit-theme";
                      // }, 1000);
                    }}
                    className='cursor'
                  />
                </NavLink>
              </div>
              <label htmlFor={theme._id} className='cursor'>
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
                  className={`phone theme-item-one ${
                    theme.blured && "smartphone-blured"
                  }`}
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
            </div>
          ))}
        </div>
      </div>
      <RenameTheme
        visible={showEditPanel}
        toggleModal={() => setShowEditPanel(false)}
        theme={selectedTheme}
      />
      <div style={{ height: "300px" }}></div>
    </div>
  );
}
