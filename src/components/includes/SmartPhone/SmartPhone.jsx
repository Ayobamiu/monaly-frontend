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
import { getLoggedInUser } from "../../../store/authSlice";
import { customLinksError } from "../../../store/customLinkSlice";

const SmartPhone = ({ customLinks, initialsOnProfile }) => {
  const currentUser = getLoggedInUser().user;

  return (
    <div class="smartphone">
      <div class="content">
        {currentUser.profilePhoto ? (
          <div className="profile-pic mt-32">
            <img
              src={currentUser.profilePhoto}
              alt="My photo"
              title="Profile"
              width="100%"
            />
          </div>
        ) : (
          <div className="profile-pic-sub mt-32" title="Profile">
            {initialsOnProfile}
          </div>
        )}
        <p className="profile-pic-p mb-16">@{currentUser.userName}</p>
        {customLinks.map((customLink) => {
          if (customLink.visible) {
            return (
              <PreviewButton
                backgroundColor="green"
                color="white"
                title={customLink.title}
                link={customLink.link}
                key={customLink._id}
              />
            );
          }
        })}

        <div className="mtb-16">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="icon"
            title="Facebook"
          />
          <FontAwesomeIcon
            icon={faLinkedinIn}
            className="icon"
            title="LinkedIn"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="icon"
            title="Instagram"
          />
          <FontAwesomeIcon icon={faYoutube} className="icon" title="YouTube" />
        </div>
        <img
          src={monaly_logo}
          alt="Monaly Logo"
          className="monaly-logo mb-32"
          height="16px"
          title="Get started with Monaly"
        />
      </div>
    </div>
  );
};

const PreviewButton = ({ color, backgroundColor, title, link }) => {
  return (
    <a href={`http://${link}`} target="_blank">
      <button
        className="custom-link-btn mb-8"
        style={{ color, backgroundColor }}
      >
        {title}
      </button>
    </a>
  );
};

export default SmartPhone;
