import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import { Link } from "react-router-dom";
import {
  loading,
  loadVisitorScreen,
  visitorViewData,
} from "../../../store/authSlice";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  matchLightSocialIcon,
  matchSocialColor,
} from "../../../assets/js/controls";

const VisitorsScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadVisitorScreen(props.match.params.userName));
  }, []);
  const visitorData = useSelector(visitorViewData);
  const loadingLinks = useSelector(loading);
  const initialsOnProfile =
    visitorData &&
    visitorData.firstName &&
    visitorData.firstName.slice(0, 2).toUpperCase();
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
        // onClick={() => {
        //   dispatch(viewCustomLink(_id));
        // }}
      >
        <button
          className={`visitors-link-btn mb-8 ${className}`}
          style={{ color, backgroundColor }}
        >
          {title}
        </button>
      </a>
    );
  };
  return (
    <div id="visitorsScreen">
      <div className="wider-content-top">
        <div className="content">
          {visitorData.profilePhoto ? (
            <div className="profile-pic mt-32">
              <img
                src={visitorData.profilePhoto}
                alt="My photo"
                title="Profile Photo"
                width="100%"
              />
            </div>
          ) : (
            <div className="profile-pic-sub mt-32" title="Profile">
              {initialsOnProfile}
            </div>
          )}{" "}
          <p className="profile-pic-p mb-16">@{visitorData.userName}</p>
          <p className="custom-p bio-p mb-16">{visitorData.bio} </p>
          <div>
            {loadingLinks && (
              <div>
                <PreviewButton className="loading" />
                <PreviewButton className="loading" />
                <PreviewButton className="loading" />
              </div>
            )}
            {visitorData.customLinks &&
              visitorData.customLinks.map((customLink) => {
                if (customLink.visible) {
                  return (
                    <PreviewButton
                      backgroundColor="#3AE09A"
                      color="white"
                      title={customLink.title}
                      link={customLink.link}
                      key={customLink._id}
                      _id={customLink._id}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="wider-content-bottom">
        <div className="mtb-8">
          {visitorData.socialMediaplatforms &&
            visitorData.socialMediaplatforms.map((social) => (
              <a
                href={social.link}
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
                  style={{ fontSize: "24px" }}
                />
              </a>
            ))}
        </div>
        <Link to="/">
          <img
            src={monaly_logo}
            alt="Monaly Logo"
            className="monaly-logo mtb-8 "
            height="16px"
            title="Get started with Monaly"
          />
        </Link>
      </div>
    </div>
  );
};

export default VisitorsScreen;
