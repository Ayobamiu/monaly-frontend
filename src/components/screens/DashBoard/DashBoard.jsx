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
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  loadcustomLinks,
  customLinks as Links,
  addcustomLink,
  loadingcustomLinks,
  customLinksError,
  removecustomLink,
} from "../../../store/customLinkSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../../store/authSlice";
import PreviewScreen from "../../includes/PreviewScreen/PreviewScreen";
import QRCode from "qrcode.react";
import { copyToClipboard, downloadQR } from "../../../assets/js/controls";

const DashBoard = () => {
  const onClickNavItem = (id) => {
    const items = document.querySelectorAll(".nav-item");
    const item = document.querySelector(".nav-item-" + id);
    items.forEach((element) => {
      element.classList.remove("active");
    });
    item.classList.add("active");
  };
  const NavigationItem = ({ index, title }) => {
    return (
      <div
        onClick={() => onClickNavItem(index)}
        className={`nav-item mb-32 mrl-16 nav-item-${index} nav-p ${
          index === "1" && "active"
        }`}
        title={title}
      >
        {title}
      </div>
    );
  };
  const dispatch = useDispatch();
  const [good, setGood] = useState(false);
  const currentCustomLinks = useSelector(Links);
  const loadingLinks = useSelector(loadingcustomLinks);
  useEffect(() => {
    dispatch(loadcustomLinks());
  }, [good]);
  const currentUser = getLoggedInUser().user;
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
          <div className="edit-screen">
            <div className="top-bar">
              <div className="nav">
                <NavigationItem index="1" title="Links" />
                <NavigationItem index="2" title="Appearance" />
                <NavigationItem index="3" title="Settings" />
              </div>
            </div>
            <div className="content">
              {loadingLinks && <div className="loader left-top"></div>}
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
              <PreviewScreen data={currentCustomLinks} />
            </div>
          </div>
          <div className="preview-screen">
            <div className="top-bar">
              <div className="user-link nav-p">
                <span>
                  <b>My monaly:</b>mona.ly/{currentUser.userName}
                </span>
                <div className="share-btn relative">
                  <button
                    className="primary-btn custom-btn-sm "
                    onClick={togglePopUp}
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
