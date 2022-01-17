/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { loading } from "../../../store/authSlice";
import { loadingUpdateCustomLinks } from "../../../store/customLinkSlice";
import AddNewTheme from "../AddNewTheme/AddNewTheme";
import EditTheme from "../AddNewTheme/EditTheme";
import Analytics from "../Analytics/Analytics";
import LinkDisplaySettings from "../LinkDisplaySettings/LinkDisplaySettings";
import MonalyThemes from "../MonalyThemes/MonalyThemes";
import MyLinks from "../MyLinks/MyLinks";
import MyThemes from "../MyThemes/MyThemes";
import Notifications from "../Notifications/Notifications";
import Pricing from "../Pricing/Pricing";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import SocialMediaSettings from "../SocialMediaSettings/SocialMediaSettings";

export default function DashboardEditSection({ path, url }) {
  const authLoading = useSelector(loading);
  const loadingLinksUpdate = useSelector(loadingUpdateCustomLinks);

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
  return (
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
            <MyLinks url={url} />
          </Route>
          <Route path={`${path}`} exact>
            <MyLinks url={url} />
          </Route>
          {/* <Route path={`${path}`} exact component={<MyLinks />} /> */}
        </div>
      </div>
    </div>
  );
}
