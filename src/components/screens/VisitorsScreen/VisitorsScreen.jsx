/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import "./css/style.css";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import { Link } from "react-router-dom";
import {
  loading,
  loadVisitorScreen,
  storeVisitorLocation,
  visitorViewData,
} from "../../../store/authSlice";
import { viewsocialMedia } from "../../../store/sociaMediaSampleSlice";

import { useDispatch, useSelector } from "react-redux";
import { matchLightSocialIcon, siteUrl } from "../../../assets/js/controls";
import { viewCustomLink } from "../../../store/customLinkSlice";
import { Helmet } from "react-helmet";
import {
  getAddressV2,
  getDeviceType,
  ipLookUp,
} from "../../../assets/js/getAddress";

const VisitorsScreen = (props) => {
  const dispatch = useDispatch();

  const divRref = useRef(null);

  useEffect(() => {
    dispatch(loadVisitorScreen(props.match.params.userName));
    divRref.current.scrollIntoView({ behavior: "smooth" });
    (async () => {
      const getIp = await ipLookUp();
      const latitude = getIp.data.lat;
      const longitude = getIp.data.lon;
      const addressFrom = await getAddressV2(
        "3b4c10a64fff96eaf6167a0c4c3926d5",
        latitude,
        longitude
      );
      dispatch(
        storeVisitorLocation(props.match.params.userName, {
          currentLocation: addressFrom.currentLocation,
          country: addressFrom.country,
          city: addressFrom.city,
          longitude,
          latitude,
          deviceType: getDeviceType(),
        })
      );
    })();
  }, [props.match.params.userName, dispatch]);

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
        <button
          className={`visitors-link-btn mb-8 ${className}`}
          style={{
            color,
            backgroundColor,
          }}
          title={title}>
          <div
            className='link-image'
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}>
            <i className={`fa ${backgroundImage} fa-3x `}></i>
          </div>
          <span className='text'>{title}</span>
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
        target='_blank'
        rel='noreferrer'
        onClick={() => {
          dispatch(viewCustomLink(_id));
        }}>
        <button
          className={`visitors-link-btn-with-img mb-8 ${className}`}
          style={{
            color: backgroundColor,
            backgroundColor: "transparent",
            background: `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%),url(${backgroundImage})`,
            height: "100px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          title={title}>
          {title}
        </button>
      </a>
    );
  };

  const titles = [];
  visitorData.customLinks &&
    visitorData.customLinks.forEach((link) => {
      titles.push(`${link.title}`);
    });
  const bgImage = visitorData.theme && visitorData.theme.backgroundImage;
  const bgColor =
    visitorData.theme && visitorData.theme.backgroundColorImageReplace;
  const blur = visitorData.theme && visitorData.theme.blur;
  const dark = visitorData.theme && visitorData.theme.dark;
  return (
    <div id='visitorsScreen'>
      <div
        className={`bg-image f${blur}`}
        style={{
          background: bgImage
            ? `linear-gradient(270deg, rgba(0, 0, 0, ${dark}) 0%, rgba(0, 0, 0, ${dark}) 100%),url('${bgImage}')`
            : bgColor,
        }}></div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta
          name='author'
          content={visitorData.firstName ? visitorData.firstName : ""}
        />
        <meta
          name='description'
          content={`${visitorData.firstName ? visitorData.firstName : ""}${
            visitorData.lastName ? visitorData.lastName : ""
          } - ${visitorData.bio ? visitorData.bio : ""} - ${titles.join(",")} `}
        />
        <meta
          property='og:title'
          content={`@${props.match.params.userName} - Monaly`}
        />
        <meta
          property='og:description'
          content={`${visitorData.firstName ? visitorData.firstName : ""}${
            visitorData.lastName ? visitorData.lastName : ""
          } - ${visitorData.bio ? visitorData.bio : ""} - ${titles.join(",")} `}
        />
        {visitorData.profilePhoto && (
          <meta property='og:image' content={visitorData.profilePhoto} />
        )}
        <meta
          name='twitter:site'
          content={`@${props.match.params.userName} - Monaly`}
        />
        <meta name='twitter:card' content='summary' />
        <meta
          name='twitter:creator'
          content={`@${props.match.params.userName} - Monaly`}
        />

        <title>@{props.match.params.userName} | Monaly</title>
        <link
          rel='canonical'
          href={`${siteUrl}${props.match.params.userName}`}
        />
      </Helmet>

      <div className='wider-content-top'>
        <div className='content'>
          {loadingLinks && <div className='loader'></div>}
          {visitorData.profilePhoto ? (
            <div className='profile-pic mt-32'>
              <img
                src={visitorData.profilePhoto}
                alt='profilePic'
                title='Profile Photo'
                width='100%'
              />
            </div>
          ) : (
            <div
              className='profile-pic-sub mt-32'
              title='Profile'
              style={{
                color: visitorData.theme && visitorData.theme.color,
              }}>
              {initialsOnProfile}
            </div>
          )}
          <p
            className='profile-pic-p mb-16'
            style={{
              color: visitorData.theme && visitorData.theme.color,
            }}>
            @{visitorData.userName}
          </p>
          <p
            className='custom-p bio-p mb-16'
            style={{
              color: visitorData.theme && visitorData.theme.color,
            }}>
            {visitorData.bio}{" "}
          </p>
          <div>
            {visitorData.customLinks &&
              visitorData.customLinks.map((customLink) => {
                if (customLink.visible) {
                  if (visitorData.stackStyle === "stacked") {
                    return (
                      <PreviewButton
                        backgroundColor={
                          visitorData.theme && visitorData.theme.backgroundColor
                        }
                        backgroundImage={customLink.image}
                        color={visitorData.theme && visitorData.theme.color}
                        title={customLink.title}
                        link={customLink.link}
                        key={customLink._id}
                        _id={customLink._id}
                      />
                    );
                  } else {
                    return (
                      <PreviewButtonWithBacground
                        backgroundColor={
                          visitorData.theme && visitorData.theme.backgroundColor
                        }
                        color={visitorData.theme && visitorData.theme.color}
                        backgroundImage={customLink.image}
                        title={customLink.title}
                        link={customLink.link}
                        key={customLink._id}
                        _id={customLink._id}
                      />
                    );
                  }
                } else return null;
              })}
          </div>
          <div className='mt-32'>
            {visitorData.socialMediaplatforms &&
              visitorData.socialMediaplatforms.map((social) => (
                <a
                  href={social.link}
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
                    color={visitorData.theme && visitorData.theme.color}
                    style={{ fontSize: "24px" }}
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className='wider-content-bottom' ref={divRref}>
        <Link target='_blank' to='/'>
          <img
            src={monaly_logo}
            alt='Monaly Logo'
            className='monaly-logo mtb-8 '
            height='16px'
            title='Get started with Monaly'
          />
        </Link>
      </div>
    </div>
  );
};

export default VisitorsScreen;
