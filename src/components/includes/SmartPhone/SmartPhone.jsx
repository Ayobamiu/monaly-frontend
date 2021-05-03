import React from "react";
import "./css/style.css";
import profilepic from "../../../assets/images/profilepic.svg";
import picp from "../../../assets/images/picp.jpg";
import monaly_logo from "../../../assets/images/pinkLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { getLoggedInUser, user } from "../../../store/authSlice";
import {
  customLinksError,
  loadingcustomLinks,
  viewCustomLink,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  matchLightSocialIcon,
  matchSocialColor,
  matchSocialIcon,
} from "../../../assets/js/controls";
import { Link } from "react-router-dom";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";
import Bimbo from "../../../assets/images/Bimbo.png";

const SmartPhone = ({ customLinks, initialsOnProfile, customSocials }) => {
  const currentUser = getLoggedInUser() && getLoggedInUser().user;
  const loadingLinks = useSelector(loadingcustomLinks);
  const userProfile = useSelector(user);
  console.log("userProfile", userProfile);

  const dispatch = useDispatch();

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
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}
      >
        <div
          className={`custom-link-btn mb-8 ${className}`}
          style={{ color, backgroundColor, borderRadius }}
        >
          <div
            className="image"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
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
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}
      >
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
          }}
        >
          <span>{title}</span>
        </div>
      </a>
    );
  };
  return (
    <div
      class="smartphone"
      style={{
        backgroundImage: `url(${
          userProfile.theme && userProfile.theme.backgroundImage
        })`,
      }}
    >
      <div class="content">
        {userProfile.profilePhoto ? (
          <div className="profile-pic mt-32">
            <img
              src={userProfile.profilePhoto}
              alt="My photo"
              title="Profile Photo"
              width="100%"
            />
          </div>
        ) : (
          <div
            className="profile-pic-sub mt-32"
            title="Profile"
            style={{
              color: userProfile.theme && userProfile.theme.color,
              backgroundColor:
                userProfile.theme && userProfile.theme.backgroundColor,
            }}
          >
            {initialsOnProfile}
          </div>
        )}
        <p
          className="profile-pic-p mb-8"
          style={{
            color: userProfile.theme && userProfile.theme.backgroundColor,
          }}
        >
          {userProfile.profileTitle || "@" + userProfile.userName}
        </p>
        <p
          className="small-p mb-24 text-center"
          style={{
            color: userProfile.theme && userProfile.theme.backgroundColor,
          }}
        >
          {userProfile.bio}
        </p>
        {loadingLinks && (
          <div>
            <PreviewButton className="loading" />
            <PreviewButton className="loading" />
            <PreviewButton className="loading" />
          </div>
        )}
        {customLinks.length > 0 ? (
          customLinks.map((customLink) => {
            if (customLink.visible) {
              if (userProfile.stackStyle === "stacked") {
                return (
                  <PreviewButton
                    backgroundColor={
                      userProfile.theme && userProfile.theme.backgroundColor
                    }
                    color={userProfile.theme && userProfile.theme.color}
                    borderRadius="4px"
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
                    backgroundColor={
                      userProfile.theme && userProfile.theme.backgroundColor
                    }
                    color={userProfile.theme && userProfile.theme.color}
                    borderRadius="4px"
                    backgroundImage={customLink.image}
                    title={customLink.title}
                    link={customLink.link}
                    key={customLink._id}
                    _id={customLink._id}
                  />
                );
              }
            }
          })
        ) : (
          <div>
            {!loadingLinks && (
              <div className="add-links-to-start">
                <p className="custom-p">Add links to get started</p>
              </div>
            )}
          </div>
        )}

        <div className="mtb-16">
          {customSocials.map((social, index) => (
            <a
              href={social.link}
              key={index}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                dispatch(viewsocialMedia(social._id));
              }}
            >
              <FontAwesomeIcon
                icon={matchLightSocialIcon(
                  social &&
                    social.mediaPlatformSample &&
                    social.mediaPlatformSample.name
                )}
                className="icon"
                title={
                  social &&
                  social.mediaPlatformSample &&
                  social.mediaPlatformSample.name
                }
                color={userProfile.theme && userProfile.theme.backgroundColor}
              />
            </a>
          ))}
        </div>
      </div>

      <div className="red">
        <Link to="/">
          <img
            src={monaly_logo}
            alt="Monaly Logo"
            className="monaly-logo"
            height="16px"
            title="Get started with Monaly"
          />
        </Link>
      </div>
    </div>
  );
};

export default SmartPhone;
