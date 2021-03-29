import React, { useEffect, useState } from "react";

import "./css/style.css";

import monalydashboardlogo from "../../../assets/images/Vector.svg";
import Comment from "../../../assets/images/Comment.svg";
import UserNotification from "../../../assets/images/UserNotification.svg";
import Notification from "../../../assets/images/Notification.svg";
import shareLinkIconBox from "../../../assets/images/shareLinkIconBox.svg";
import colorLinkedIn from "../../../assets/images/colorLinkedIn.svg";
import colorInstagram from "../../../assets/images/colorInstagram.svg";
import colorWhatsapp from "../../../assets/images/colorWhatsapp.svg";
import colorTwitter from "../../../assets/images/colorTwitter.svg";
import colorFacebook from "../../../assets/images/colorFacebook.svg";

import { Link } from "react-router-dom";
import AddLinkBox from "../../includes/AddLinkBox/AddLink";
import SmartPhone from "../../includes/SmartPhone/SmartPhone";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  loadcustomLinks,
  customLinks as Links,
  addcustomLink,
  loadingcustomLinks,
  customLinksError,
  removecustomLink,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
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
  socialIcons,
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
} from "../../../store/authSlice";

const DashBoard = () => {
  const onClickNavItem = (id) => {
    const items = document.querySelectorAll(".nav-item");
    const item = document.querySelector(".nav-item-" + id);
    items.forEach((element) => {
      element.classList.remove("active");
    });
    item.classList.add("active");
  };

  const NavigationItem = ({ index, title, forHtml, selected }) => {
    return (
      <div
        onClick={() => onClickNavItem(index)}
        className={`nav-item mb-32 mrl-16 cursor nav-item-${index} nav-p ${
          index === "1" && "active"
        }`}
        title={title}
        id={`${forHtml}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#${forHtml}`}
        type="button"
        role="tab"
        aria-controls={forHtml}
        aria-selected={selected}
      >
        {title}
      </div>
    );
  };

  const dispatch = useDispatch();
  const [good, setGood] = useState(false);
  const userProfile = useSelector(user);
  console.log("userProfile", userProfile);
  const currentCustomLinks = useSelector(Links);
  const currentSocialMediaSamples = useSelector(socialMediaSamples);
  const currentUserSocials = useSelector(userSocials);
  const loadingLinks = useSelector(loadingcustomLinks);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [currentSocialMediaSampleId, setCurrentSocialMediaSampleId] = useState(
    ""
  );
  const [newSocialLink, setNewSocialLink] = useState("");
  useEffect(() => {
    dispatch(loadcustomLinks());
    dispatch(loadsocialMediaSamples());
    dispatch(loadUserSocials());
    dispatch(loadLoggedInUser());
  }, [good]);
  const currentUser = getLoggedInUser().user;
  const [modal, setModal] = useState(false);

  console.log(currentUser);
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

  const [newLink, setNewLink] = useState(" ");
  const [newTitle, setNewTitle] = useState(" ");
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

  return (
    <>
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
                {currentUser.lastName} {currentUser.firstName}
              </p>
              <p className="small-p">https://mona.ly/{currentUser.userName}</p>
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
                onClick={() =>
                  setShowPopupForEditProfile(!showPopupForEditProfile)
                }
              >
                {initialsOnProfile}
                <span className="new-notification"></span>
              </div>
              {showPopupForEditProfile && (
                <div className="popup-edit-profile">
                  <button
                    data-bs-toggle="tab"
                    data-bs-target="#appearance"
                    type="button"
                    class="nav-item active"
                    role="tab"
                    aria-controls="appearance"
                    aria-selected="false"
                    id="appearance-tab"
                  >
                    Edit profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="edit-screen">
            <div className="top-bar">
              <div className="nav">
                <NavigationItem index="1" title="Links" forHtml="links" />
                <NavigationItem
                  index="2"
                  title="Appearance"
                  forHtml="appearance"
                />
                <NavigationItem index="3" title="Settings" forHtml="settings" />
              </div>
            </div>
            <div className="wider-content">
              <div className="content tab-content">
                <div
                  className="tab-pane fade show active"
                  id="links"
                  role="tabpanel"
                  aria-labelledby="links-tab"
                >
                  <div className="metric">
                    <div className="metric-box">
                      <p>Clicks</p>
                      <h2>{userProfile.clickCount}</h2>
                    </div>
                    <div className="metric-box">
                      <p>CTR</p>
                      <h2>10%</h2>
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
                  <form action="Add new Custom link">
                    <button
                      className="link-btn mb-32"
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
                <div
                  class="tab-pane fade"
                  id="appearance"
                  role="tabpanel"
                  aria-labelledby="appearance-tab"
                >
                  <h2>Profile</h2>
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
                          newFormData.append("profilePhoto", e.target.files[0]);
                          dispatch(uploadUserPhotos(newFormData));
                        }}
                      />
                      Pick an image
                    </label>
                    <button
                      className=" inactive"
                      title="Remove Profile Photo"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(deleteProfilePhoto());
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={userProfile.userName || "Profile Title"}
                    className="add-profile-title"
                    title="Change Username"
                    name="userName"
                    onChange={(e) => {
                      e.preventDefault();
                      dispatch(updateUserProfile({ userName: e.target.value }));
                    }}
                  />
                  <textarea
                    name="bio"
                    id="bio"
                    cols="60"
                    rows="10"
                    title="Change Bio"
                    placeholder={userProfile.bio || "Bio"}
                    onChange={(e) => {
                      e.preventDefault();
                      dispatch(updateUserProfile({ bio: e.target.value }));
                    }}
                  ></textarea>
                </div>
                <div
                  class="tab-pane fade"
                  id="settings"
                  role="tabpanel"
                  aria-labelledby="settings-tab"
                >
                  ...
                </div>
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
                    href={`https://mona.ly/${currentUser.userName}`}
                  >
                    <u>mona.ly/{currentUser.userName}</u>
                  </a>
                </span>
                <div className="share-btn relative">
                  <button
                    className="primary-btn custom-btn-sm "
                    onClick={togglePopUp}
                    title="Share Your Monaly Link"
                  >
                    share
                  </button>
                  {showPopup && (
                    <div className="popup">
                      <button
                        onClick={(e) => {
                          copyToClipboard(
                            e,
                            `https://mona.ly/${currentUser.userName}`
                          );
                          showSuccessAlert();
                        }}
                      >
                        Copy your monaly URL
                      </button>
                      <button onClick={toggleQrModal}>
                        Download my monaly QR code
                      </button>
                    </div>
                  )}
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
    </>
  );
};

export default DashBoard;
