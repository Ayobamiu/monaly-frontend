/** @format */

import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotifications } from "../../../store/notificationSlice";
import "./css/style.css";

const Notifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadNotifications());
  }, [dispatch]);
  const notifications = useSelector((state) => state.app.notifications.list);

  return (
    <div id='notifications'>
      {notifications.map((item) => (
        <div className='notification-item'>
          <div
            className='notification-item-image'
            style={{
              backgroundImage: `url(${item.image})`,
            }}></div>
          <div className='notification-item-text'>
            <header>{item.title}</header>
            <p>{item.body}</p>
            <a href={item.link} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className='click-notification'
                color='#4e4b66'
              />
            </a>
          </div>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className='no-notifications'>
          <h2>Nothing here yet</h2>
          <p className='custom-p'>You will see all your notifications here</p>
        </div>
      )}
      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default Notifications;
