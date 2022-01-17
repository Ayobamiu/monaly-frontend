/** @format */

import React from "react";
import { Link } from "react-router-dom";
import monalydashboardlogo from "../../../assets/images/Vector.svg";
import Comment from "../../../assets/images/Comment.svg";
// import Notification from "../../../assets/images/Notification.svg";
// import ForwardArrow from "../../../assets/images/ForwardArrow.svg";

// import { UncontrolledPopover } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { getLoggedInUser, logUserOut } from "../../../store/authSlice";

export default function DashboardSideBar({ path, url }) {
  const dispatch = useDispatch();
  // const notifications = useSelector((state) => state.app.notifications.list);
  const currentUser = getLoggedInUser();
  const initialsOnProfile =
    currentUser &&
    currentUser.firstName &&
    currentUser.firstName.slice(0, 2).toUpperCase();
  const userProfile = useSelector((state) => state.app.user.profile);

  return (
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
        <a href='mailto: contact@monaly.co' target='_blank' rel='noreferrer'>
          <img src={Comment} alt='' title='Comment' />
        </a>
        {/* <img
          src={Notification}
          alt=''
          title='Notification'
          id='showNotificationsPopUp'
          className='cursor'
        /> */}
        {/* <UncontrolledPopover
          trigger='legacy'
          placement='right'
          target='showNotificationsPopUp'>
          <div className='popup-notifications'>
            <div className='see-all-notifications-button'>
              <NavLink to={`${url}/notifications`}>
                <span>See all notifications</span>
                <img
                  src={ForwardArrow}
                  alt='Forward Arrow'
                  className='add-media-in-settings-arrow'
                />
              </NavLink>
            </div>
            {notifications.map((item) => (
              <div className='popup-notifications-item'>
                <header>
                  {item.title && item.title.slice(0, 45)}
                  {item.title && item.title.length > 45 && "..."}
                </header>
                <body>
                  <div
                          className='image'
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}></div>
                  <div className='text'>
                    {item.body && item.body.slice(0, 130)}
                    {item.body && item.body.length > 130 && "..."}
                  </div>
                </body>
                <a href={item.link} target='_blank' rel='noreferrer'>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className='click-notification'
                    color='#4e4b66'
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
  );
}
