/** @format */

import { message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UncontrolledPopover } from "reactstrap";
import {
  copyToClipboard,
  siteUrl,
  siteUrlMinusHttps,
} from "../../../assets/js/controls";
import { getLoggedInUser } from "../../../store/authSlice";
import { customLinks } from "../../../store/customLinkSlice";
import { userSocials } from "../../../store/sociaMediaSampleSlice";
import SmartPhone from "../SmartPhone/SmartPhone";

export default function DashboardPreviewSection() {
  const currentUserSocials = useSelector(userSocials);
  const currentCustomLinks = useSelector(customLinks);
  const currentUser = getLoggedInUser();
  const initialsOnProfile =
    currentUser &&
    currentUser.firstName &&
    currentUser.firstName.slice(0, 2).toUpperCase();
  const [showPopup, setShowPopup] = useState(false);
  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className='preview-screen'>
      <div className='top-bar'>
        <div className='user-link nav-p'>
          <span title='Your Monaly Link'>
            <b>My monaly: </b>
            <a
              className='nav-p'
              href={`${siteUrl}${currentUser && currentUser.userName}`}
              target='_blank'
              rel='noreferrer'>
              <u>
                {siteUrlMinusHttps}
                {currentUser && currentUser.userName}
              </u>
            </a>
          </span>
          <div className='share-btn relative'>
            <UncontrolledPopover
              trigger='legacy'
              placement='bottom-end'
              target='desktopPopShare'>
              <div className='popup'>
                <button
                  onClick={(e) => {
                    copyToClipboard(
                      e,
                      `${siteUrl}${currentUser && currentUser.userName}`
                    );
                    message.success("Link copied to clipboard!");
                    setShowPopup(false);
                  }}>
                  Copy your monaly URL
                </button>
                {/* <button
                        onClick={() => {
                          toggleQrModal();
                          setShowPopup(false);
                        }}>
                        Download my monaly QR code
                      </button> */}
              </div>
            </UncontrolledPopover>
            <button
              className='primary-btn-inverse custom-btn-sm share-button-toggler'
              onClick={togglePopUp}
              title='Share Your Monaly Link'
              id='desktopPopShare'>
              Share
            </button>
          </div>
        </div>
      </div>
      <div className='phone-preview'>
        <SmartPhone
          customSocials={currentUserSocials}
          customLinks={currentCustomLinks}
          initialsOnProfile={initialsOnProfile}
        />
      </div>
    </div>
  );
}
