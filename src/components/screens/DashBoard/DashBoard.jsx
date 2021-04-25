import React, { useEffect, useState } from "react";
import { UncontrolledPopover } from "reactstrap";
import "./css/style.css";
import monalydashboardlogo from "../../../assets/images/Vector.svg";
import Comment from "../../../assets/images/Comment.svg";
import Notification from "../../../assets/images/Notification.svg";
import ForwardArrow from "../../../assets/images/ForwardArrow.svg";
import NotificationMobile from "../../../assets/images/NotificationMobile.svg";
import shareLinkIconBox from "../../../assets/images/shareLinkIconBox.svg";
import colorLinkedIn from "../../../assets/images/colorLinkedIn.svg";
import colorInstagram from "../../../assets/images/colorInstagram.svg";
import colorWhatsapp from "../../../assets/images/colorWhatsapp.svg";
import colorTwitter from "../../../assets/images/colorTwitter.svg";
import colorFacebook from "../../../assets/images/colorFacebook.svg";

import {
  Link,
  NavLink,
  Redirect,
  Route,
  useRouteMatch,
} from "react-router-dom";
import SmartPhone from "../../includes/SmartPhone/SmartPhone";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faLink,
  faTimes,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import {
  loadcustomLinks,
  customLinks as Links,
  addcustomLink,
  loadingcustomLinks,
  loadingUpdateCustomLinks,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  logUserOut,
  updateUserProfile,
  uploadUserPhotos,
} from "../../../store/authSlice";
import PreviewScreen from "../../includes/PreviewScreen/PreviewScreen";
import QRCode from "qrcode.react";
import {
  checkUserHasSocial,
  copyToClipboard,
  downloadQR,
  matchSocialColor,
  matchSocialIcon,
  clickThroughRatio,
  siteUrl,
} from "../../../assets/js/controls";

import {
  loadsocialMediaSamples,
  socialMediaSamples,
  addsocialMedia,
  userSocials,
  loadUserSocials,
} from "../../../store/sociaMediaSampleSlice";
import {
  loadLoggedInUser,
  user,
  deleteProfilePhoto,
  loading,
} from "../../../store/authSlice";
import themeOneBackground from "../../../assets/images/themeOne.png";
import picp from "../../../assets/images/picp.jpg";
import chilli from "../../../assets/images/chilli.jpg";
import abstract from "../../../assets/images/abstract.jpg";
import { loadthemes } from "../../../store/themeSlice";

const DashBoard = (props) => {
  const Settings = () => {
    return (
      <div>
        <div id="settings">...</div>
      </div>
    );
  };

  const dispatch = useDispatch();
  const [good, setGood] = useState(false);
  const userProfile = useSelector(user);
  const currentCustomLinks = useSelector(Links);
  const currentSocialMediaSamples = useSelector(socialMediaSamples);
  const currentUserSocials = useSelector(userSocials);
  const loadingLinks = useSelector(loadingcustomLinks);
  const loadingLinksUpdate = useSelector(loadingUpdateCustomLinks);
  const authLoading = useSelector(loading);
  const themes = useSelector((state) => state.app.themes.list);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [currentSocialMediaSampleId, setCurrentSocialMediaSampleId] = useState(
    ""
  );
  console.log("themes", themes);
  console.log("currentCustomLinks", currentCustomLinks);
  const [newSocialLink, setNewSocialLink] = useState("");
  useEffect(() => {
    dispatch(loadthemes());
    dispatch(loadcustomLinks());
    dispatch(loadsocialMediaSamples());
    dispatch(loadUserSocials());
    dispatch(loadLoggedInUser());
    // console.log(getWhereUserIsLocated());
  }, [good]);
  const currentUser = getLoggedInUser() && getLoggedInUser().user;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const addEmptyCustomLink = () => {
    dispatch(
      addcustomLink({
        title: newTitle,
        link: newLink,
      })
    );
  };

  const initialsOnProfile =
    currentUser &&
    currentUser.firstName &&
    currentUser.firstName.slice(0, 2).toUpperCase();

  const [newLink, setNewLink] = useState("New link ");
  const [newTitle, setNewTitle] = useState("New title ");
  const [showPopup, setShowPopup] = useState(false);
  const [qrmodal, setQrmodal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showPopupForEditProfile, setShowPopupForEditProfile] = useState(false);
  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };

  const toggleQrModal = () => {
    setQrmodal(!qrmodal);
  };

  const showSuccessAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1000);
  };

  const handleShowArrowDown = (index, item) => {
    const allArrowDowns = document.querySelectorAll(".social-icon-angle");
    const targetArrowDown = document.querySelector(
      `.social-icon-angle-${index}`
    );
    const targetInput = document.querySelector(".social-input");
    setInputPlaceholder(item.name);
    setCurrentSocialMediaSampleId(item._id);
    if (targetArrowDown.classList.contains("hide")) {
      for (let index = 0; index < allArrowDowns.length; index++) {
        const item = allArrowDowns[index];
        item.classList.add("hide");
      }
      targetArrowDown.classList.remove("hide");
      targetInput.classList.remove("hide");
    } else {
      for (let index = 0; index < allArrowDowns.length; index++) {
        const item = allArrowDowns[index];
        item.classList.add("hide");
      }
      targetInput.classList.add("hide");
    }
  };

  const targetTextarea = document.querySelector(".edit-screen textarea");
  const targetTextareaLength =
    targetTextarea && targetTextarea.value && targetTextarea.value.length;
  let { path, url } = useRouteMatch();

  const NavigationItem = ({ title, to }) => {
    return (
      <NavLink
        to={`${url}/${to}`}
        activeClassName="active"
        className="nav-item mb-32 mb-16-900 mrl-16 cursor nav-p"
        title={title}
      >
        {title}
      </NavLink>
    );
  };
  const BottomNavigationItem = ({ title, to, icon }) => {
    return (
      <NavLink
        to={`${url}/${to}`}
        activeClassName="active"
        title={title}
        className="mobile-bottom-nav-item"
      >
        <FontAwesomeIcon
          icon={icon}
          alt={title}
          title={title}
          className="mobile-bottom-nav-item-icon"
        />
        <span>{title}</span>
      </NavLink>
    );
  };

  return (
    <div id="mobile-holder">
      <div className="mobile-top-nav">
        <Link to="/" className="mr-auto">
          <img src={monalydashboardlogo} alt="" height="28.46px" />
        </Link>
        <img src={NotificationMobile} alt="" title="Notification" />

        <div className="user-round-avatar-small">
          {userProfile.profilePhoto ? (
            <img src={userProfile.profilePhoto} height="100%" alt="" />
          ) : (
            initialsOnProfile
          )}
        </div>
      </div>
      <div className="mobile-top-nav-share-box">
        <span title="Your Monaly Link">
          <b>My monaly:&nbsp;</b>
          <a
            href={`https://${siteUrl}${currentUser && currentUser.userName}`}
            target="_blank"
          >
            <u> mona.ly/{currentUser && currentUser.userName}</u>
          </a>
        </span>
        <div className="share-btn relative">
          <button
            className="primary-btn-inverse custom-btn-xsm share-button-toggler share-button-mobile"
            title="Share Your Monaly Link"
            id="mobileCopyLinkPopUp"
          >
            Share
          </button>

          <UncontrolledPopover
            trigger="focus"
            placement="bottom"
            target="mobileCopyLinkPopUp"
          >
            <div className="popup">
              <button
                onClick={(e) => {
                  copyToClipboard(
                    e,
                    `${siteUrl}${currentUser && currentUser.userName}`
                  );
                  showSuccessAlert();
                  setShowPopup(false);
                }}
              >
                Copy your monaly URL
              </button>
              <button
                onClick={() => {
                  toggleQrModal();
                  setShowPopup(false);
                }}
              >
                Download my monaly QR code
              </button>
            </div>
          </UncontrolledPopover>
          {/* )} */}
        </div>
      </div>

      {alert && (
        <div class="alert success-bg alert-dismissible fade show" role="alert">
          <strong>Linked copied to clipboard!</strong>
        </div>
      )}
      <div className="push-to-center">
        <div id="dashboard">
          <Modal isOpen={modal} toggle={toggle}>
            <div className="custom-modal">
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
              <h2 className="share-box-head mt-32">Share your link</h2>
              <div className="images">
                <img src={shareLinkIconBox} alt="" />
                <img src={colorTwitter} alt="" />
                <img src={colorFacebook} alt="" />
                <img src={colorWhatsapp} alt="" />
                <img src={colorInstagram} alt="" />
                <img src={colorLinkedIn} alt="" />
              </div>
              <button className="primary-btn mt-48">
                Share to all social accounts
              </button>
            </div>
          </Modal>
          <Modal className="qrmodal" isOpen={qrmodal} toggle={toggleQrModal}>
            <div className="qrbox" id="qrbox">
              <p className="custom-p">
                {currentUser && currentUser.lastName}{" "}
                {currentUser && currentUser.firstName}
              </p>
              <p className="small-p">
                {siteUrl}
                {currentUser && currentUser.userName}
              </p>
              <QRCode
                id="qrcode"
                value="http://facebook.github.io/react/"
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
            <button onClick={downloadQR} className="primary-btn mt-16 ">
              Download QR code
            </button>
          </Modal>
          <div className="side-bar">
            <div className="top-bar">
              <div className="logo">
                <Link to="/">
                  <img
                    src={monalydashboardlogo}
                    alt="Monaly logo"
                    title="Go to Homepage"
                  />
                </Link>
              </div>
            </div>
            <div className="action-icons relative">
              <img src={Comment} alt="" title="Comment" />
              <img src={Notification} alt="" title="Notification" />
              <div
                className="link-to-user-profile mt-32 cursor"
                id="showSetProfilePopUp"
              >
                {initialsOnProfile}
                <span className="new-notification"></span>
              </div>
              {/* {showPopupForEditProfile && ( */}

              <UncontrolledPopover
                trigger="legacy"
                placement="right"
                target="showSetProfilePopUp"
              >
                <div className="popup-edit-profile">
                  <div
                    class="dark-action-p"
                    onClick={() => {
                      setShowPopupForEditProfile(false);
                    }}
                  >
                    @{userProfile.userName}
                  </div>

                  <Link
                    to={`${path}/appearance`}
                    onClick={() => {
                      setShowPopupForEditProfile(false);
                    }}
                    className="no-underline"
                  >
                    <button class="nav-item active">Edit your profile</button>
                  </Link>
                  <button
                    class="nav-item active"
                    onClick={() => {
                      setShowPopupForEditProfile(false);
                      dispatch(logUserOut());
                    }}
                  >
                    Logout
                  </button>
                </div>
              </UncontrolledPopover>
              {/* )} */}
            </div>
          </div>
          <div className="edit-screen">
            <div className="top-bar">
              <div className="nav">
                <NavigationItem index="1" title="Links" to="links" />
                <NavigationItem index="2" title="Appearance" to="appearance" />

                <NavigationItem index="3" title="Settings" to="settings" />
                {authLoading || loadingLinksUpdate ? (
                  <div className="loader"></div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="wider-content">
              <div className="content tab-content">
                <Redirect from={`${path}`} to={`${path}/links`} />
                <Route path={`${path}/links`}>
                  <div>
                    <div id="links">
                      <div className="metric">
                        <div
                          className="metric-box"
                          title="Count of all clicks on your links"
                        >
                          <p>Clicks</p>
                          <h2>{userProfile.clickCount || 0}</h2>
                        </div>
                        <div
                          className="metric-box"
                          title="Percentage of visitors that clicks at least a link when visiting your page"
                        >
                          <p>CTR</p>
                          <h2>{clickThroughRatio(userProfile)}%</h2>
                        </div>
                      </div>
                      <div className="add-social-box">
                        <h4>Add social media links</h4>
                        {currentSocialMediaSamples.map((icon, index) => (
                          <div className="social-icon-item" key={index}>
                            {icon && (
                              <FontAwesomeIcon
                                icon={matchSocialIcon(icon.name)}
                                className="social-icon cursor"
                                color={matchSocialColor(icon.name)}
                                onClick={() => handleShowArrowDown(index, icon)}
                              />
                            )}
                            <FontAwesomeIcon
                              icon={faAngleDown}
                              color="#EF476F"
                              className={`social-icon-angle hide social-icon-angle-${index}`}
                            />
                          </div>
                        ))}

                        <div className="social-input hide">
                          <form
                            action="Add Social Media Platform"
                            onSubmit={(e) => {
                              e.preventDefault();

                              const dataToSubmit = {
                                mediaPlatformSample: currentSocialMediaSampleId,
                                link: newSocialLink,
                              };
                              dispatch(addsocialMedia(dataToSubmit));
                            }}
                          >
                            <input
                              type="url"
                              placeholder={
                                checkUserHasSocial(
                                  inputPlaceholder,
                                  currentUserSocials
                                ) || `${inputPlaceholder} URL`
                              }
                              required
                              onChange={(e) => {
                                e.preventDefault();
                                setNewSocialLink(e.target.value);
                              }}
                            />
                            <button type="submit">Save</button>
                          </form>
                        </div>
                      </div>
                      <NavLink
                        to={`${url}/settings`}
                        className="add-media-in-settings"
                      >
                        <span>Add social media handles in settings</span>
                        <img
                          src={ForwardArrow}
                          alt="Forward Arrow"
                          className="add-media-in-settings-arrow"
                        />
                      </NavLink>
                      <form action="Add new Custom link">
                        <button
                          className="link-btn mb-32 mb-16-900"
                          onClick={(e) => {
                            e.preventDefault();
                            addEmptyCustomLink();
                          }}
                          type="submit"
                        >
                          Add New Link
                        </button>
                      </form>
                      {loadingLinks && (
                        <>
                          <div className="add-link-box loading"></div>
                          <div className="add-link-box loading"></div>
                          <div className="add-link-box loading"></div>
                        </>
                      )}
                      <PreviewScreen data={currentCustomLinks} />
                    </div>
                  </div>
                </Route>
                <Route path={`${path}/appearance`}>
                  <div>
                    <div id="appearance">
                      <h2>Profile settings</h2>
                      <div className="appearance-box">
                        <div className="house-avatar">
                          {userProfile.profilePhoto ? (
                            <div className="avatar">
                              <img
                                src={userProfile.profilePhoto}
                                alt=""
                                height="100%"
                                title="Profile Photo"
                              />
                            </div>
                          ) : (
                            <div className="avatar"> {initialsOnProfile}</div>
                          )}
                          <div className="image-btns">
                            <label
                              htmlFor="file-upload"
                              className="cursor"
                              title="Pick A Profile Photo"
                            >
                              <input
                                type="file"
                                name=""
                                id="file-upload"
                                className="custom-file-input"
                                onChange={(e) => {
                                  e.preventDefault();
                                  console.log("Clicked ", e.target.files[0]);
                                  const newFormData = new FormData();
                                  newFormData.append(
                                    "profilePhoto",
                                    e.target.files[0]
                                  );
                                  dispatch(uploadUserPhotos(newFormData));
                                }}
                              />
                              Pick an image
                            </label>
                            {userProfile && userProfile.profilePhoto && (
                              <button
                                className="primary-btn-inverse custom-btn-sm "
                                title="Remove Profile Photo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(deleteProfilePhoto());
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Profile Title"
                          className="add-profile-title"
                          title="Change Profile Title"
                          name="profileTitle"
                          defaultValue={userProfile.profileTitle}
                          onChange={(e) => {
                            e.preventDefault();
                            dispatch(
                              updateUserProfile({
                                profileTitle: e.target.value,
                              })
                            );
                          }}
                          onBlur={(e) => {
                            if (e.target.value.length > 0) {
                            }
                          }}
                        />
                        <textarea
                          name="bio"
                          id="bio"
                          cols="60"
                          rows="10"
                          title="Change Bio"
                          placeholder="Bio"
                          defaultValue={userProfile.bio}
                          onChange={(e) => {
                            e.preventDefault();
                            dispatch(
                              updateUserProfile({ bio: e.target.value })
                            );
                          }}
                          maxLength="80"
                        ></textarea>
                        <div className="textarea-count">
                          <span>{targetTextareaLength || 0}/80</span>
                        </div>
                      </div>

                      <h2>Link display style</h2>
                      <div className="appearance-box">
                        <div className="style-items">
                          <div className="style-item">
                            <input
                              type="radio"
                              name="styleSelect"
                              id="stackStyle"
                              checked={userProfile.stackStyle === "stacked"}
                              value="stacked"
                              onChange={(e) => {
                                e.preventDefault();
                                dispatch(
                                  updateUserProfile({
                                    stackStyle: e.target.value,
                                  })
                                );
                              }}
                            />
                            <span class="checkmark"></span>
                            <label class="input-container" htmlFor="stackStyle">
                              Stacked
                            </label>
                            <div className="phone">
                              <div className="phone-stack"></div>
                              <div className="phone-stack"></div>
                              <div className="phone-stack"></div>
                              <div className="phone-stack"></div>
                              <div className="phone-stack"></div>
                            </div>
                          </div>
                          <div className="style-item">
                            <input
                              type="radio"
                              name="styleSelect"
                              id="galleryStyle"
                              value="cards"
                              checked={userProfile.stackStyle === "cards"}
                              onChange={(e) => {
                                e.preventDefault();
                                dispatch(
                                  updateUserProfile({
                                    stackStyle: e.target.value,
                                  })
                                );
                              }}
                            />
                            <span class="checkmark"></span>
                            <label
                              class="input-container"
                              htmlFor="galleryStyle"
                            >
                              Gallery
                            </label>
                            <div className="phone phone-grids">
                              <div className="phone-grid"></div>
                              <div className="phone-grid"></div>
                              <div className="phone-grid"></div>
                              <div className="phone-grid"></div>
                            </div>
                          </div>
                          <div className="style-item">
                            <input
                              type="radio"
                              name="styleSelect"
                              id="mixedStyle"
                              value="mixed"
                              checked={userProfile.stackStyle === "mixed"}
                              onChange={(e) => {
                                e.preventDefault();
                                dispatch(
                                  updateUserProfile({
                                    stackStyle: e.target.value,
                                  })
                                );
                              }}
                            />
                            <span class="checkmark"></span>
                            <label class="input-container" htmlFor="mixedStyle">
                              Mixed
                            </label>
                            <div className="phone phone-mixed">
                              <div className="phone-grid"></div>
                              <div className="phone-grid"></div>
                              <div className="phone-stack"></div>
                              <div className="phone-stack"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h2>Themes</h2>
                      <div className="appearance-box">
                        <div className="style-items">
                          {themes.map((theme) => (
                            <div className="style-item ">
                              <input
                                type="radio"
                                name="themeSelect"
                                id={theme._id}
                                value={theme._id}
                                checked={
                                  userProfile.theme &&
                                  userProfile.theme._id === theme._id
                                }
                                onChange={(e) => {
                                  e.preventDefault();
                                  dispatch(
                                    updateUserProfile({ theme: e.target.value })
                                  );
                                  console.log("theme", e.target.value);
                                }}
                              />
                              <span class="checkmark"></span>
                              <label
                                class="input-container"
                                htmlFor={theme._id}
                              >
                                {theme.name}
                              </label>
                              <div
                                className="phone theme-item-one"
                                style={{
                                  // backgroundImage: `url("https://via.placeholder.com/500")`,
                                  backgroundImage: `url(${theme.backgroundImage})`,
                                }}
                              >
                                <div className="phone-stack"></div>
                                <div className="phone-stack"></div>
                                <div className="phone-stack"></div>
                                <div className="phone-stack"></div>
                                <div className="phone-stack"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ height: "100px" }}></div>
                    </div>
                  </div>
                </Route>
                <Route path={`${path}/settings`} component={Settings} />
              </div>
            </div>
          </div>
          <div className="preview-screen">
            <div className="top-bar">
              <div className="user-link nav-p">
                <span title="Your Monaly Link">
                  <b>My monaly: </b>
                  <a
                    className="nav-p"
                    href={`https://${siteUrl}${
                      currentUser && currentUser.userName
                    }`}
                    target="_blank"
                  >
                    <u>mona.ly/{currentUser && currentUser.userName}</u>
                  </a>
                </span>
                <div className="share-btn relative">
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="desktopPopShare"
                  >
                    <div className="popup">
                      <button
                        onClick={(e) => {
                          copyToClipboard(
                            e,
                            `${siteUrl}${currentUser && currentUser.userName}`
                          );
                          showSuccessAlert();
                          setShowPopup(false);
                        }}
                      >
                        Copy your monaly URL
                      </button>
                      <button
                        onClick={() => {
                          toggleQrModal();
                          setShowPopup(false);
                        }}
                      >
                        Download my monaly QR code
                      </button>
                    </div>
                  </UncontrolledPopover>
                  <button
                    className="primary-btn-inverse custom-btn-sm share-button-toggler"
                    onClick={togglePopUp}
                    title="Share Your Monaly Link"
                    id="desktopPopShare"
                  >
                    Share
                  </button>
                  {/* {showPopup && ( */}
                  {/* )} */}
                </div>
              </div>
            </div>
            <div className="phone-preview">
              <SmartPhone
                customSocials={currentUserSocials}
                customLinks={currentCustomLinks}
                initialsOnProfile={initialsOnProfile}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-bottom-nav">
        <BottomNavigationItem title="Links" to="links" icon={faLink} />

        <BottomNavigationItem
          title="Appearance"
          to="appearance"
          icon={faSmile}
        />
        <BottomNavigationItem title="Settings" to="settings" icon={faCog} />
      </div>
    </div>
  );
};

export default DashBoard;
