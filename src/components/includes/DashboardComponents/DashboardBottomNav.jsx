/** @format */

import { faCog, faLink, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardBottomNav({ url }) {
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
  return (
    <div className='mobile-bottom-nav'>
      <BottomNavigationItem title='Links' to='links' icon={faLink} />

      <BottomNavigationItem title='Appearance' to='appearance' icon={faSmile} />
      <BottomNavigationItem title='Socials' to='settings' icon={faCog} />
    </div>
  );
}
