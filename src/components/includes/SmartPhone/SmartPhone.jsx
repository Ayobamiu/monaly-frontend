/** @format */

import React from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/pinkLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { user } from "../../../store/authSlice";
import {
  loadingcustomLinks,
  viewCustomLink,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import { matchLightSocialIcon } from "../../../assets/js/controls";
import { Link, useLocation } from "react-router-dom";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";

const SmartPhone = ({ customLinks, initialsOnProfile, customSocials }) => {
  const loadingLinks = useSelector(loadingcustomLinks);
  const userProfile = useSelector(user);

  const testTextColor = useSelector(
    (state) => state.app.customLinks.testTextColor
  );
  const testLinkColor = useSelector(
    (state) => state.app.customLinks.testLinkColor
  );

  const testBackgroundImage = useSelector(
    (state) => state.app.customLinks.testBackgroundImage
  );
  const testBlurPercent = useSelector(
    (state) => state.app.customLinks.testBlurPercent
  );
  const testDarkPercent = useSelector(
    (state) => state.app.customLinks.testDarkPercent
  );
  const testBackgroundColor = useSelector(
    (state) => state.app.customLinks.testBackgroundColor
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const addingTheme =
    pathname === "/dashboard/add-theme" || pathname === "/dashboard/edit-theme";

  const PreviewButton = ({
    color,
    backgroundColor,
    backgroundImage,
    borderRadius,
    title,
    link,
    className,
    _id,
  }) => {
    return (
      <a
        href={`${link}`}
        target='_blank'
        rel='noreferrer'
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}>
        <div
          className={`custom-link-btn mb-8 ${className}`}
          style={{ color, backgroundColor, borderRadius }}>
          <div
            className='image'
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}></div>
          <span>{title}</span>
        </div>
      </a>
    );
  };
  const PreviewButtonWithBackground = ({
    color,
    backgroundColor,
    borderRadius,
    title,
    link,
    className,
    _id,
    backgroundImage,
  }) => {
    return (
      <a
        href={`${link}`}
        target='_blank'
        rel='noreferrer'
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}>
        <div
          className={`custom-link-btn-with-img mb-8 ${className}`}
          style={{
            color: "white",
            backgroundColor: "transparent",
            background: `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%),url('${backgroundImage}')`,
            height: "100px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <span>{title}</span>
        </div>
      </a>
    );
  };

  const bgImage = addingTheme
    ? testBackgroundImage
    : userProfile.theme && userProfile.theme.backgroundImage;
  const bgColor = addingTheme
    ? testBackgroundColor
    : userProfile.theme && userProfile.theme.backgroundColorImageReplace;
  const blur = addingTheme
    ? testBlurPercent
    : userProfile.theme && userProfile.theme.blur;
  const dark = addingTheme
    ? testDarkPercent
    : userProfile.theme && userProfile.theme.dark;
  const color = addingTheme
    ? testTextColor
    : userProfile.theme && userProfile.theme.color;
  const linkColor = addingTheme
    ? testLinkColor
    : userProfile.theme && userProfile.theme.backgroundColor;
  return (
    <div class='smartphone'>
      <div
        className={`bg-image f${blur}`}
        style={{
          background: bgImage
            ? `linear-gradient(270deg, rgba(0, 0, 0, ${dark}) 0%, rgba(0, 0, 0, ${dark}) 100%),url('${bgImage}')`
            : bgColor,
        }}></div>
      <div>
        <div class='content'>
          {userProfile.profilePhoto ? (
            <div className='profile-pic mt-32'>
              <img
                src={userProfile.profilePhoto}
                alt='Profile'
                title='Profile Photo'
                width='100%'
              />
            </div>
          ) : (
            <div
              className='profile-pic-sub mt-32'
              title='Profile'
              style={{ color, backgroundColor: linkColor }}>
              {initialsOnProfile}
            </div>
          )}
          <p
            className='profile-pic-p mb-8'
            style={{
              color: color,
            }}>
            {userProfile.profileTitle || "@" + userProfile.userName}
          </p>
          <p className='small-p mb-24 text-center' style={{ color }}>
            {userProfile.bio}
          </p>
          {loadingLinks && (
            <div>
              <PreviewButton className='loading' />
              <PreviewButton className='loading' />
              <PreviewButton className='loading' />
            </div>
          )}
          {customLinks.length > 0 ? (
            customLinks.map((customLink) => {
              if (customLink.visible) {
                if (userProfile.stackStyle === "stacked") {
                  return (
                    <PreviewButton
                      backgroundColor={linkColor}
                      color={color}
                      borderRadius='4px'
                      title={customLink.title}
                      link={customLink.link}
                      key={customLink._id}
                      _id={customLink._id}
                      backgroundImage={customLink.image}
                    />
                  );
                } else {
                  return (
                    <PreviewButtonWithBackground
                      backgroundColor={linkColor}
                      color={color}
                      borderRadius='4px'
                      backgroundImage={customLink.image}
                      title={customLink.title}
                      link={customLink.link}
                      key={customLink._id}
                      _id={customLink._id}
                    />
                  );
                }
              } else return null;
            })
          ) : (
            <div>
              {!loadingLinks && (
                <div className='add-links-to-start'>
                  <p className='custom-p'>Add links to get started</p>
                </div>
              )}
            </div>
          )}
          <div className='mtb-16'>
            {customSocials.map((social, index) => (
              <a
                href={social.link}
                key={index}
                target='_blank'
                rel='noreferrer'
                onClick={() => {
                  dispatch(viewsocialMedia(social._id));
                }}>
                <FontAwesomeIcon
                  icon={matchLightSocialIcon(
                    social &&
                      social.mediaPlatformSample &&
                      social.mediaPlatformSample.name
                  )}
                  className='icon'
                  title={
                    social &&
                    social.mediaPlatformSample &&
                    social.mediaPlatformSample.name
                  }
                  color={color}
                />
              </a>
            ))}
          </div>
        </div>
        <div className='red'>
          <Link to='/'>
            <img
              src={monaly_logo}
              alt='Monaly Logo'
              className='monaly-logo'
              height='16px'
              title='Get started with Monaly'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartPhone;
