/** @format */

import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import bin from "../../../assets/images/bin.svg";
import Edit from "../../../assets/images/Edit.svg";
import gallery from "../../../assets/images/gallery.svg";
import CustomInput from "../CustomInput/CustomInput";
import FuzzySearch from "fuzzy-search"; // Or: var FuzzySearch = require('fuzzy-search');

import "./css/style.css";
import { loadingUpdateCustomLinks } from "../../../store/customLinkSlice";
import { useSelector } from "react-redux";
import { loading } from "../../../store/authSlice";
import iconList from "../../../assets/jsons/iconList.json";

const AddLinkBox = ({
  title,
  link,
  visible,
  _id,
  onChangeLink,
  onChangeTitle,
  onChangeSwitch,
  onClickDelete,
  hideDeleteAndSwitch,
  onChangeImage,
  image,
}) => {
  const authLoading = useSelector(loading);
  const loadingLinksUpdate = useSelector(loadingUpdateCustomLinks);
  const [checkedStatus, setCheckedStatus] = useState(visible);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searcher = new FuzzySearch(iconList, [], {
    caseSensitive: true,
  });
  let result = iconList.slice(0, 20);
  if (searchQuery) {
    result = searcher.search(searchQuery).slice(0, 20);
  }
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
    // setFile(info.file.originFileObj);
    // dispatch(
    //   changeCustomLinkInput(
    //     "testBackgroundImage",
    //     URL.createObjectURL(info.file.originFileObj)
    //   )
    // );
    // const newFormData = new FormData();
    // newFormData.append("profilePhoto", info.file.originFileObj);
    // dispatch(uploadUserPhotos(newFormData));
    const newFormData = new FormData();
    newFormData.append("image", info.file.originFileObj);
    onChangeImage(newFormData);
  };
  return (
    <div className={`add-link-box  ${!checkedStatus && `opaque`}`} id={_id}>
      <div className='inputs-and-media space-between flex-column'>
        <div>
          <div className='text-icon custom-p fsz-14-900 bg-light my-2 p-1 rounded-pill px-3 position-relative d-flex align-items-center'>
            <input
              type='text'
              placeholder={title || "Title"}
              style={{ fontWeight: "bold" }}
              id={`titleinput${_id}`}
              defaultValue={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              className='bg-light'
            />
            <div className='float-edit-button'>
              <img
                src={Edit}
                alt=''
                onClick={() => {
                  document.getElementById(`titleinput${_id}`).focus();
                }}
                title='Edit Title'
              />
            </div>
          </div>
          <div className='text-icon custom-p fsz-14-900 bg-light my-2 p-1 rounded-pill px-3 position-relative d-flex align-items-center'>
            <input
              type='url'
              placeholder={link || "Paste link here"}
              id={`linkinput${_id}`}
              defaultValue={link}
              onChange={(e) => onChangeLink(e.target.value)}
              className='bg-light'
            />
            <div className='float-edit-button'>
              <img
                src={Edit}
                alt=''
                onClick={() => {
                  document.getElementById(`linkinput`).focus();
                }}
                title='Edit Link'
              />
            </div>
          </div>
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
      <div className='switch-and-delete'>
        <div class='form-check form-switch form-switch-lg'>
          <input
            class='form-check-input custom-switch'
            type='checkbox'
            id={`checkbox${_id}`}
            onChange={(e) => {
              setCheckedStatus(e.target.checked);
              onChangeSwitch(e.target.checked ? "true" : "false");
            }}
            title='Toggle Visibility'
            checked={checkedStatus}
          />
        </div>
        <img src={bin} alt='' title='Delete' onClick={(e) => onClickDelete()} />
      </div>
      <Modal
        title={null}
        footer={null}
        // closable={false}
        visible={showModal}
        onCancel={() => setShowModal(false)}>
        <p className='link-medium'>
          Select Image
          {authLoading || loadingLinksUpdate ? (
            <div className='loader d-inline-block'></div>
          ) : (
            ""
          )}{" "}
        </p>
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
                  onChangeImage({ image: "" });
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
                onChangeImage({ image: icon });
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
};

export default AddLinkBox;
