/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickThroughRatio } from "../../../assets/js/controls";
import ForwardArrow from "../../../assets/images/ForwardArrow.svg";
import gallery from "../../../assets/images/gallery.svg";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  addcustomLink,
  customLinks,
  loadingcustomLinks,
} from "../../../store/customLinkSlice";
import PreviewScreen from "../PreviewScreen/PreviewScreen";

export default function MyLinks() {
  const userProfile = useSelector((state) => state.app.user.profile);
  const loadingLinks = useSelector(loadingcustomLinks);
  const currentCustomLinks = useSelector(customLinks);
  const dispatch = useDispatch();

  let { url } = useRouteMatch();
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div>
      <div>
        <div id='links'>
          <div className='metric'>
            <div
              className='metric-box'
              title='Count of all clicks on your links'>
              <p>Clicks</p>
              <h2>{userProfile.clickCount || 0}</h2>
            </div>
            <div
              className='metric-box'
              title='Percentage of visitors that clicks at least a link when visiting your page'>
              <p>CTR</p>
              <h2>{clickThroughRatio(userProfile)}%</h2>
            </div>
          </div>
          <NavLink to={`${url}/settings`} className='add-media-in-settings'>
            <span>Add social media handles in settings</span>
            <img
              src={ForwardArrow}
              alt='Forward Arrow'
              className='add-media-in-settings-arrow'
            />
          </NavLink>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newFormData = new FormData();
              if (image) {
                newFormData.append("image", image);
              }
              newFormData.set("title", title);
              newFormData.set("link", link);
              dispatch(addcustomLink(newFormData));
            }}>
            <div className={`add-link-box`}>
              <div className='inputs-and-media w-100 space-between flex-column'>
                <div className=''>
                  <input
                    type='text'
                    placeholder='Title'
                    style={{ fontWeight: "bold" }}
                    className='bg-light fsz-14-900 my-2 rounded-pill p-2 px-4  w-100 border-0 '
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type='url'
                    placeholder='Paste link here'
                    className='bg-light fsz-14-900 my-2 rounded-pill p-2 px-4  w-100 border-0 '
                    required
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className='align-end'>
                  {/* <img
                                className="mr-16 opaque"
                                src={Calandar}
                                alt=""
                                title="Schedule"
                              /> */}
                  <label
                    htmlFor='link-image-input-main'
                    className='align-end mb-0'>
                    <img
                      className='mr-16'
                      src={gallery}
                      alt=''
                      title='Add media'
                    />
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='link-image-input-main'
                    className='link-image-input'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {/* <img
                                className="mr-16 opaque"
                                src={Heart}
                                alt=""
                                title="Favourite"
                              /> */}
                </div>
              </div>
            </div>
            <button className='link-btn mb-32 mb-16-900' type='submit'>
              Add New Link
            </button>
          </form>
          {loadingLinks && (
            <>
              <div className='add-link-box loading'></div>
              <div className='add-link-box loading'></div>
              <div className='add-link-box loading'></div>
            </>
          )}
          <PreviewScreen data={currentCustomLinks} />
        </div>
      </div>
    </div>
  );
}
