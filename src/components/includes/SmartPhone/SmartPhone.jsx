import React from "react";
import "./css/style.css";
import profilepic from "../../../assets/images/profilepic.svg";
import picp from "../../../assets/images/picp.jpg";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
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
} from "../../../assets/js/controls";
import { Link } from "react-router-dom";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";

const SmartPhone = ({ customLinks, initialsOnProfile, customSocials }) => {
  const currentUser = getLoggedInUser() && getLoggedInUser().user;
  const loadingLinks = useSelector(loadingcustomLinks);
  const userProfile = useSelector(user);

  const dispatch = useDispatch();

  const PreviewButton = ({
    color,
    backgroundColor,
    title,
    link,
    className,
    _id,
  }) => {
    return (
      <a
        href={`http://${link}`}
        target="_blank"
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}
      >
        <button
          className={`custom-link-btn mb-8 ${className}`}
          style={{ color, backgroundColor }}
        >
          {title}
        </button>
      </a>
    );
  };
  return (
    <div class="smartphone">
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
          <div className="profile-pic-sub mt-32" title="Profile">
            {initialsOnProfile}
          </div>
        )}
        <p className="profile-pic-p mb-16">@{userProfile.userName}</p>
        {loadingLinks && (
          <div>
            <PreviewButton className="loading" />
            <PreviewButton className="loading" />
            <PreviewButton className="loading" />
          </div>
        )}
        {customLinks.map((customLink) => {
          if (customLink.visible) {
            return (
              <PreviewButton
                backgroundColor="green"
                color="white"
                title={customLink.title}
                link={customLink.link}
                key={customLink._id}
                _id={customLink._id}
              />
            );
          }
        })}

        <div className="mtb-16">
          {customSocials.map((social, index) => (
            <a
              href={social.link}
              key={index}
              target="_blank"
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
                color={matchSocialColor(
                  social &&
                    social.mediaPlatformSample &&
                    social.mediaPlatformSample.name
                )}
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
