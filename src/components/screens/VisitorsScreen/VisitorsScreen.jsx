import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import picp from "../../../assets/images/picp.jpg";
import Bimbo from "../../../assets/images/Bimbo.png";
import { Link } from "react-router-dom";
import {
  loading,
  loadVisitorScreen,
  storeVisitorLocation,
  visitorViewData,
} from "../../../store/authSlice";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  matchLightSocialIcon,
  matchSocialColor,
} from "../../../assets/js/controls";
import { getAddress, ipLookUp } from "../../../assets/js/getAddress";
import { viewCustomLink } from "../../../store/customLinkSlice";

const VisitorsScreen = (props) => {
  const dispatch = useDispatch();

  const divRref = useRef(null);

  useEffect(async () => {
    dispatch(loadVisitorScreen(props.match.params.userName));
    divRref.current.scrollIntoView({ behavior: "smooth" });

    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        async function success(position) {
          // for when getting location is a success
          // getAddress(position.coords.latitude, position.coords.longitude);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const addressFrom = await getAddress(latitude, longitude);
          dispatch(
            storeVisitorLocation(
              props.match.params.userName,
              addressFrom.currentLocation,
              addressFrom.country,
              addressFrom.city
            )
          );
        },
        async function error(error_message) {
          // for when getting location results in an error
          console.error(
            "An error has occured while retrieving" + "location",
            error_message
          );
          const getIp = await ipLookUp();
          const latitude = getIp.data.lat;
          const longitude = getIp.data.lon;
          const addressFrom = await getAddress(latitude, longitude);
          dispatch(
            storeVisitorLocation(
              props.match.params.userName,
              addressFrom.currentLocation,
              addressFrom.country,
              addressFrom.city
            )
          );
        }
      );
    } else {
      const getIp = await ipLookUp();
      const latitude = getIp.data.lat;
      const longitude = getIp.data.lon;
      const addressFrom = await getAddress(latitude, longitude);
      dispatch(
        storeVisitorLocation(
          props.match.params.userName,
          addressFrom.currentLocation,
          addressFrom.country,
          addressFrom.city
        )
      );
    }
  }, []);

  const visitorData = useSelector(visitorViewData);
  console.log("visitorData", visitorData);
  const loadingLinks = useSelector(loading);
  // const stackStyle = useSelector(loading);
  const stackStyle = useSelector((state) => state.app.user.stackStyle);
  // console.log("stackStyle", stackStyle);
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
    backgroundImage,
  }) => {
    return (
      <a
        href={`${link}`}
        target="_blank"
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}
      >
        <button
          className={`visitors-link-btn mb-8 ${className}`}
          style={{
            color,
            backgroundColor,
          }}
          title={title}
        >
          <div
            className="link-image"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <span className="text">{title}</span>
        </button>
      </a>
    );
  };
  const PreviewButtonWithBacground = ({
    color,
    backgroundColor,
    title,
    link,
    className,
    backgroundImage,
    _id,
  }) => {
    return (
      <a
        href={`${link}`}
        target="_blank"
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}
      >
        <button
          className={`visitors-link-btn-with-img mb-8 ${className}`}
          style={{
            color,
            backgroundColor: "transparent",
            background: `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%),url(${backgroundImage})`,
            height: "100px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          title={title}
        >
          {title}
        </button>
      </a>
    );
  };

  return (
    <div
      id="visitorsScreen"
      style={{
        backgroundImage: `url(${
          visitorData.theme && visitorData.theme.backgroundImage
        })`,
      }}
    >
      <div className="wider-content-top">
        <div className="content">
          {loadingLinks && <div className="loader"></div>}
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
          )}
          <p className="profile-pic-p mb-16">@{visitorData.userName}</p>
          <p className="custom-p bio-p mb-16">{visitorData.bio} </p>
          <div>
            {visitorData.customLinks &&
              visitorData.customLinks.map((customLink) => {
                if (customLink.visible) {
                  if (visitorData.stackStyle === "stacked") {
                    return (
                      <PreviewButton
                        backgroundColor={customLink.backgroundColor}
                        color={customLink.color}
                        title={customLink.title}
                        link={customLink.link}
                        key={customLink._id}
                        _id={customLink._id}
                      />
                    );
                  } else {
                    return (
                      <PreviewButtonWithBacground
                        backgroundColor="#3AE09A"
                        color="white"
                        title={customLink.title}
                        link={customLink.link}
                        key={customLink._id}
                        _id={customLink._id}
                      />
                    );
                  }
                }
              })}
          </div>
          <div className="mt-32">
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
        </div>
      </div>
      <div className="wider-content-bottom" ref={divRref}>
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
