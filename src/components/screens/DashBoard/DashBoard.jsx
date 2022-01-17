/** @format */

import React, { useEffect, useState } from "react";
import "./css/style.css";
import monalydashboardlogo from "../../../assets/images/Vector.svg";
import Comment from "../../../assets/images/Comment.svg";
import Close from "../../../assets/images/Close.svg";
import shareLinkIconBox from "../../../assets/images/shareLinkIconBox.svg";
import colorLinkedIn from "../../../assets/images/colorLinkedIn.svg";
import colorInstagram from "../../../assets/images/colorInstagram.svg";
import colorWhatsapp from "../../../assets/images/colorWhatsapp.svg";
import colorTwitter from "../../../assets/images/colorTwitter.svg";
// import Notification from "../../../assets/images/Notification.svg";
import colorFacebook from "../../../assets/images/colorFacebook.svg";

import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  loadcustomLinks,
  customLinks as Links,
  loadingUpdateCustomLinks,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  getMySubscription,
  getMyVisitors,
  logUserOut,
} from "../../../store/authSlice";
import QRCode from "qrcode.react";
import {
  copyToClipboard,
  downloadQR,
  siteUrl,
  siteUrlMinusHttps,
} from "../../../assets/js/controls";

import {
  loadsocialMediaSamples,
  userSocials,
  loadUserSocials,
} from "../../../store/sociaMediaSampleSlice";
import { loadLoggedInUser, loading } from "../../../store/authSlice";
import { loadMyThemes, loadthemes } from "../../../store/themeSlice";
import { loadNotifications } from "../../../store/notificationSlice";
import SmartPhoneContent from "../../includes/SmartPhoneContent/SmartPhoneContent";

import { message } from "antd";
import DashboardPreviewSection from "../../includes/DashboardComponents/DashboardPreviewSection";
import DashboardEditSection from "../../includes/DashboardComponents/DashboardEditSection";
import DashboardSideBar from "../../includes/DashboardComponents/DashboardSideBar";
import DashboardBottomNav from "../../includes/DashboardComponents/DashboardBottomNav";

const DashBoard = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.app.user.profile);
  const currentCustomLinks = useSelector(Links);
  const currentUserSocials = useSelector(userSocials);
  const loadingLinksUpdate = useSelector(loadingUpdateCustomLinks);
  const authLoading = useSelector(loading);

  useEffect(() => {
    dispatch(loadMyThemes());
    dispatch(loadthemes());
    dispatch(loadcustomLinks());
    dispatch(loadsocialMediaSamples());
    dispatch(loadUserSocials());
    dispatch(loadLoggedInUser());
    dispatch(loadNotifications());
    dispatch(getMySubscription());
    dispatch(getMyVisitors());

    document.title = "Dashboard | Monaly";
  }, [dispatch]);
  const currentUser = getLoggedInUser();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const initialsOnProfile =
    currentUser &&
    currentUser.firstName &&
    currentUser.firstName.slice(0, 2).toUpperCase();

  const [qrmodal, setQrmodal] = useState(false);

  const toggleQrModal = () => {
    setQrmodal(!qrmodal);
  };

  let { path, url } = useRouteMatch();

  const [showPreview, setShowPreview] = useState(false);

  const { pathname } = useLocation();

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
  const addingTheme =
    pathname === "/dashboard/add-theme" || pathname === "/dashboard/edit-theme";

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

  return (
    <div id='mobile-holder'>
      <button
        className='show-mobile-offcanvas'
        onClick={() => {
          setShowPreview(true);
        }}>
        Preview
      </button>
      {showPreview && (
        <div class='mobile-offcanvas'>
          <div
            className={`bg-image f${blur}`}
            style={{
              background: bgImage
                ? `linear-gradient(270deg, rgba(0, 0, 0, ${dark}) 0%, rgba(0, 0, 0, ${dark}) 100%),url('${bgImage}')`
                : bgColor,
            }}></div>
          <div
            className='close-mobile-offcanvas cursor'
            onClick={() => setShowPreview(false)}>
            <img src={Close} alt='' onClick={() => setShowPreview(false)} />
          </div>
          <SmartPhoneContent
            customSocials={currentUserSocials}
            customLinks={currentCustomLinks}
            initialsOnProfile={initialsOnProfile}
          />
        </div>
      )}
      <div className='mobile-top-nav'>
        <Link to='/' className='mr-auto'>
          <img src={monalydashboardlogo} alt='' height='28.46px' />
        </Link>
        {authLoading || loadingLinksUpdate ? (
          <div className='loader'></div>
        ) : (
          ""
        )}
        <a
          href='mailto: contact@monaly.co'
          target='_blank'
          className='mx-3'
          rel='noreferrer'>
          <img src={Comment} alt='' title='Chat with Us' />
        </a>
        {/* <Link to={`${path}/notifications`}>
          <img src={Notification} alt='' title='Notification' />
        </Link> */}

        <div
          className='user-round-avatar-small cursor'
          id='mobileShowUserProfilePopUp'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          style={{ backgroundImage: `url(${userProfile.profilePhoto})` }}>
          {!userProfile.profilePhoto && initialsOnProfile}
        </div>
        <div
          // trigger=""
          // placement="bottom"
          // target="mobileShowUserProfilePopUp"
          class='dropdown-menu popup'
          aria-labelledby='mobileShowUserProfilePopUp'>
          {/* <div className="popup"> */}
          <Link to={`${path}/appearance`}>
            <button>Profile</button>
          </Link>
          <Link to={`${path}/analytics`}>
            <button>My Analytics</button>
          </Link>
          {/* <Link to={`${path}/settings#subscriptions`}>
              <button>My Subscriptions</button>
            </Link> */}
          <Link to={`${path}/pricing`}>
            <button>Join the PROs</button>
          </Link>
          <button
            class='nav-item active'
            onClick={() => {
              dispatch(logUserOut());
            }}>
            Logout
          </button>
          {/* </div> */}
        </div>
      </div>
      <div className='mobile-top-nav-share-box'>
        <span title='Your Monaly Link'>
          <b>My monaly:&nbsp;</b>
          <a
            href={`${siteUrl}${currentUser && currentUser.userName}`}
            target='_blank'
            rel='noreferrer'>
            <u>
              {" "}
              {`${siteUrlMinusHttps}${currentUser && currentUser.userName}`}
            </u>
          </a>
        </span>
        <div className='share-btn relative'>
          <FontAwesomeIcon
            icon={faClone}
            color='white'
            size='lg'
            onClick={(e) => {
              copyToClipboard(
                e,
                `${siteUrl}${currentUser && currentUser.userName}`
              );
              message.success("Link copied to clipboard!");
            }}
          />
        </div>
      </div>

      <div className='push-to-center'>
        <div id='dashboard'>
          <Modal isOpen={modal} toggle={toggle}>
            <div className='custom-modal'>
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  cursor: "pointer",
                }}
                onClick={toggle}
              />
              <h2 className='share-box-head mt-32'>Share your link</h2>
              <div className='images'>
                <img src={shareLinkIconBox} alt='' />
                <img src={colorTwitter} alt='' />
                <img src={colorFacebook} alt='' />
                <img src={colorWhatsapp} alt='' />
                <img src={colorInstagram} alt='' />
                <img src={colorLinkedIn} alt='' />
              </div>
              <button className='primary-btn mt-48'>
                Share to all social accounts
              </button>
            </div>
          </Modal>
          <Modal className='qrmodal' isOpen={qrmodal} toggle={toggleQrModal}>
            <div className='qrbox' id='qrbox'>
              <p className='custom-p'>
                {currentUser && currentUser.lastName}{" "}
                {currentUser && currentUser.firstName}
              </p>
              <p className='small-p'>
                {siteUrl}
                {currentUser && currentUser.userName}
              </p>
              <QRCode
                id='qrcode'
                value='http://facebook.github.io/react/'
                imageSettings={{
                  src: monalydashboardlogo,
                  height: 30,
                  width: 30,
                  excavate: true,
                }}
                // includeMargin={true}
                size={200}
              />
            </div>
            <button onClick={downloadQR} className='primary-btn mt-16 '>
              Download QR code
            </button>
          </Modal>

          <DashboardSideBar path={path} url={url} />
          <DashboardEditSection path={path} url={url} />
          {pathname !== "/dashboard/analytics" && <DashboardPreviewSection />}
        </div>
      </div>
      <DashboardBottomNav url={url} />
    </div>
  );
};

export default DashBoard;
