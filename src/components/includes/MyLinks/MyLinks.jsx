/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickThroughRatio } from "../../../assets/js/controls";
import ForwardArrow from "../../../assets/images/ForwardArrow.svg";
import gallery from "../../../assets/images/gallery.svg";
import { NavLink } from "react-router-dom";
import {
  addcustomLink,
  changeCustomLinkInput,
  customLinks,
  loadingcustomLinks,
} from "../../../store/customLinkSlice";
import PreviewScreen from "../PreviewScreen/PreviewScreen";
import prependHttp from "prepend-http";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import CustomInput from "../CustomInput/CustomInput";
import FuzzySearch from "fuzzy-search"; // Or: var FuzzySearch = require('fuzzy-search');
import iconList from "../../../assets/jsons/iconList.json";

export default function MyLinks({ url }) {
  const addLinkStatus = useSelector(
    (state) => state.app.customLinks.addLinkStatus
  );
  const addingLink = useSelector((state) => state.app.customLinks.addingLink);
  const userProfile = useSelector((state) => state.app.user.profile);
  const loadingLinks = useSelector(loadingcustomLinks);
  const currentCustomLinks = useSelector(customLinks);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState("");

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleChange = (info) => {
    setFile(info.file.originFileObj);
    setImage(URL.createObjectURL(info.file.originFileObj));
  };
  const searcher = new FuzzySearch(iconList, [], {
    caseSensitive: true,
  });
  let result = iconList.slice(0, 20);
  if (searchQuery) {
    result = searcher.search(searchQuery).slice(0, 20);
  }
  useEffect(() => {
    if (addLinkStatus === "success") {
      document.getElementById("newLinkId").value = "";
      document.getElementById("title").value = "";
    }
    dispatch(changeCustomLinkInput("addLinkStatus", "pending"));
  }, [addLinkStatus, addingLink, dispatch]);

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
                if (file) {
                  newFormData.append("image", file);
                } else {
                  newFormData.append("image", image);
                }
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
                    id='title'
                  />
                  <input
                    type='url'
                    placeholder='Paste link here'
                    className='bg-light fsz-14-900 my-2 rounded-pill p-2 px-4  w-100 border-0 '
                    required
                    onChange={(e) => {
                      document.getElementById("newLinkId").value = prependHttp(
                        e.target.value
                      );
                      setLink(e.target.value);
                    }}
                    id='newLinkId'
                  />
                </div>
                <div className='d-flex'>
                  {!image && (
                    <img
                      className='mr-16 cursor'
                      src={gallery}
                      alt=''
                      title='Add media'
                      onClick={() => setShowModal(true)}
                    />
                  )}
                  {image && (
                    <div
                      className='text-center cursor'
                      onClick={() => setShowModal(true)}>
                      <div
                        className='add-link-selected-media sm'
                        style={{ backgroundImage: `url('${image}')` }}>
                        <i className={`fa ${image} fa-lg  text-muted`}></i>
                      </div>
                    </div>
                  )}
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
      <Modal
        title={null}
        footer={null}
        // closable={false}
        visible={showModal}
        onCancel={() => setShowModal(false)}>
        <p className='link-medium'>Select Image</p>
        <div className='d-flex add-link-selected-media-box'>
          <ImgCrop rotate>
            <Upload
              name='profile_image'
              listType='picture-card'
              showUploadList={false}
              onPreview={onPreview}
              onChange={handleChange}>
              <img className='mr-16' src={gallery} alt='' title='Add media' />
            </Upload>
          </ImgCrop>
          {image && (
            <div className='text-center'>
              <div
                className='add-link-selected-media'
                style={{ backgroundImage: `url('${image}')` }}>
                <i className={`fa ${image} fa-3x text-muted`}></i>
              </div>
              <div
                className='link-small text-danger cursor'
                onClick={() => {
                  setImage("");
                  setFile("");
                }}>
                Delete
              </div>
            </div>
          )}
        </div>
        <p className='link-medium'>Select Icon</p>
        <CustomInput
          placeholder='Search icons'
          id='IconsList'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='border p-3 rounded rounded-4 d-flex flex-wrap justify-content-around my-3'>
          {result.slice(0, 20).map((icon) => (
            <div
              className='add-link-icon cursor'
              onClick={() => {
                setImage(icon);
                setFile("");
              }}>
              <i className={`fa fa-2x ${icon} text-muted`}></i>
            </div>
          ))}
          {result.length === 0 && (
            <div className={`no-visitors-details text-center`}>
              <h2>No search result </h2>
              <p className='custom-p'>
                You will see list of icons to select here
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
