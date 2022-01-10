/** @format */

import React, { useEffect, useState } from "react";
import { UncontrolledPopover } from "reactstrap";
import "./css/style.css";
import monalydashboardlogo from "../../../assets/images/Vector.svg";
import Comment from "../../../assets/images/Comment.svg";
import Close from "../../../assets/images/Close.svg";
import shareLinkIconBox from "../../../assets/images/shareLinkIconBox.svg";
import colorLinkedIn from "../../../assets/images/colorLinkedIn.svg";
import colorInstagram from "../../../assets/images/colorInstagram.svg";
import colorWhatsapp from "../../../assets/images/colorWhatsapp.svg";
import colorTwitter from "../../../assets/images/colorTwitter.svg";
import colorFacebook from "../../../assets/images/colorFacebook.svg";

import {
  Link,
  NavLink,
  Route,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import SmartPhone from "../../includes/SmartPhone/SmartPhone";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTimes, faCog } from "@fortawesome/free-solid-svg-icons";
import { faClone, faSmile } from "@fortawesome/free-regular-svg-icons";
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
import Pricing from "../../includes/Pricing/Pricing";
import Analytics from "../../includes/Analytics/Analytics";
import { loadNotifications } from "../../../store/notificationSlice";
import Notifications from "../../includes/Notifications/Notifications";
import SmartPhoneContent from "../../includes/SmartPhoneContent/SmartPhoneContent";

import { message } from "antd";
import AddNewTheme from "../../includes/AddNewTheme/AddNewTheme";
import MyThemes from "../../includes/MyThemes/MyThemes";
import MonalyThemes from "../../includes/MonalyThemes/MonalyThemes";
import SocialMediaSettings from "../../includes/SocialMediaSettings/SocialMediaSettings";
import ProfileSettings from "../../includes/ProfileSettings/ProfileSettings";
import LinkDisplaySettings from "../../includes/LinkDisplaySettings/LinkDisplaySettings";
import MyLinks from "../../includes/MyLinks/MyLinks";
import EditTheme from "../../includes/AddNewTheme/EditTheme";

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

  const [showPopup, setShowPopup] = useState(false);
  const [qrmodal, setQrmodal] = useState(false);

  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };

  const toggleQrModal = () => {
    setQrmodal(!qrmodal);
  };

  let { path, url } = useRouteMatch();

  const NavigationItem = ({ title, to }) => {
    return (
      <NavLink
        to={`${url}/${to}`}
        activeClassName='active'
        className='nav-item mb-32 mb-16-900 mrl-16 cursor nav-p'
        title={title}>
        {title}
      </NavLink>
    );
  };

  const BottomNavigationItem = ({ title, to, icon }) => {
    return (
      <NavLink
        to={`${url}/${to}`}
        activeClassName='active'
        title={title}
        className='mobile-bottom-nav-item'>
        <FontAwesomeIcon
          icon={icon}
          alt={title}
          title={title}
          className='mobile-bottom-nav-item-icon'
        />
        <span>{title}</span>
      </NavLink>
    );
  };
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
          <img src={Notification} alt="" title="Notification" />
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
          <div className='side-bar'>
            <div className='top-bar'>
              <div className='logo'>
                <Link to='/'>
                  <img
                    src={monalydashboardlogo}
                    alt='Monaly logo'
                    title='Go to Homepage'
                  />
                </Link>
              </div>
            </div>
            <div className='action-icons relative'>
              <a
                href='mailto: contact@monaly.co'
                target='_blank'
                rel='noreferrer'>
                <img src={Comment} alt='' title='Comment' />
              </a>
              {/* <img
                src={Notification}
                alt=""
                title="Notification"
                id="showNotificationsPopUp"
                className="cursor"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="right"
                target="showNotificationsPopUp"
              >
                <div className="popup-notifications">
                  <div className="see-all-notifications-button">
                    <NavLink to={`${url}/notifications`}>
                      <span>See all notifications</span>
                      <img
                        src={ForwardArrow}
                        alt="Forward Arrow"
                        className="add-media-in-settings-arrow"
                      />
                    </NavLink>
                  </div>
                  {notifications.map((item) => (
                    <div className="popup-notifications-item">
                      <header>
                        {item.title && item.title.slice(0, 45)}
                        {item.title && item.title.length > 45 && "..."}
                      </header>
                      <body>
                        <div
                          className="image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="text">
                          {item.body && item.body.slice(0, 130)}
                          {item.body && item.body.length > 130 && "..."}
                        </div>
                      </body>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon
                          icon={faArrowAltCircleRight}
                          className="click-notification"
                          color="#4e4b66"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </UncontrolledPopover> */}

              <div
                className='link-to-user-profile mt-32 cursor'
                id='showSetProfilePopUp'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                {initialsOnProfile}
                <span className='new-notification'></span>
              </div>

              <div
                class='dropdown-menu popup-edit-profile'
                aria-labelledby='showSetProfilePopUp'>
                <div class='dark-action-p' onClick={() => {}}>
                  @{userProfile.userName}
                </div>

                <Link
                  to={`${path}/appearance`}
                  onClick={() => {}}
                  className='no-underline'>
                  <button class='nav-item active'>Edit your profile</button>
                </Link>
                <button
                  class='nav-item active'
                  onClick={() => {
                    dispatch(logUserOut());
                  }}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className='edit-screen'>
            <div className='top-bar'>
              <div className='nav hide-at-900'>
                <NavigationItem index='1' title='Links' to='links' />
                <NavigationItem index='2' title='Appearance' to='appearance' />

                <NavigationItem index='3' title='Socials' to='settings' />
                <NavigationItem index='4' title='Pricing' to='pricing' />
                <NavigationItem index='5' title='Analytics' to='analytics' />
                {authLoading || loadingLinksUpdate ? (
                  <div className='loader'></div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className='wider-content'>
              <div className='content tab-content'>
                {/* <Redirect from={`${path}`} to={`${path}/links`} /> */}

                <Route path={`${path}/appearance`}>
                  <div>
                    <div id='appearance'>
                      <ProfileSettings />
                      <LinkDisplaySettings />
                      <MonalyThemes />
                      <MyThemes />
                      <div style={{ height: "300px" }}></div>
                    </div>
                  </div>
                </Route>
                <Route path={`${path}/settings`}>
                  <div id='appearance'>
                    <SocialMediaSettings />
                  </div>

                  <div style={{ height: "300px" }}></div>
                </Route>
                <Route path={`${path}/analytics`}>
                  <div id='appearance'>
                    <Analytics />
                  </div>
                </Route>
                <Route path={`${path}/pricing`}>
                  <div id='appearance'>
                    <h2>Pricing</h2>
                    <Pricing />
                  </div>
                  <div style={{ height: "300px" }}></div>
                </Route>
                <Route path={`${path}/notifications`}>
                  <div id='appearance'>
                    <h2>Notifications</h2>
                    <Notifications />
                  </div>
                  <div style={{ height: "300px" }}></div>
                </Route>
                <Route path={`${path}/add-theme`}>
                  <AddNewTheme />
                  <div style={{ height: "300px" }}></div>
                </Route>
                <Route path={`${path}/edit-theme`}>
                  <EditTheme />
                  <div style={{ height: "300px" }}></div>
                </Route>
                <Route path={`${path}/links`}>
                  <MyLinks />
                </Route>
                <Route path={`${path}`} exact>
                  <MyLinks />
                </Route>
                {/* <Route path={`${path}`} exact component={<MyLinks />} /> */}
              </div>
            </div>
          </div>
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
        </div>
      </div>
      <div className='mobile-bottom-nav'>
        <BottomNavigationItem title='Links' to='links' icon={faLink} />

        <BottomNavigationItem
          title='Appearance'
          to='appearance'
          icon={faSmile}
        />
        <BottomNavigationItem title='Socials' to='settings' icon={faCog} />
      </div>
    </div>
  );
};

export default DashBoard;
