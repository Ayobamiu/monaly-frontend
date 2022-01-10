/** @format */

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import AppButton from "../AppButton/AppButton";
import CustomInput from "../CustomInput/CustomInput";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomLinkInput } from "../../../store/customLinkSlice";
import ImgCrop from "antd-img-crop";

import { message, Spin, Upload } from "antd";
import { changeThemesInput, updateTheme } from "../../../store/themeSlice";
import { useHistory } from "react-router-dom";
import { Modal, Slider, InputNumber, Row, Col } from "antd";
import { updateUserProfile } from "../../../store/authSlice";
import { LoadingOutlined } from "@ant-design/icons";
export default function EditTheme() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  let history = useHistory();
  const testThemeName = useSelector(
    (state) => state.app.customLinks.testThemeName
  );
  const testTextColor = useSelector(
    (state) => state.app.customLinks.testTextColor
  );
  const testLinkColor = useSelector(
    (state) => state.app.customLinks.testLinkColor
  );
  const testBlurPercent = useSelector(
    (state) => state.app.customLinks.testBlurPercent
  );
  const testDarkPercent = useSelector(
    (state) => state.app.customLinks.testDarkPercent
  );
  const testBackgroundColor = useSelector(
    (state) => state.app.customLinks.testBackgroundColor
  );
  const testBackgroundBlur = useSelector(
    (state) => state.app.customLinks.testBackgroundBlur
  );
  const testBackgroundImage = useSelector(
    (state) => state.app.customLinks.testBackgroundImage
  );
  const updatingUserProfile = useSelector(
    (state) => state.app.user.updatingUserProfile
  );
  const updatingTheme = useSelector((state) => state.app.themes.updatingTheme);
  const updatingThemeStatus = useSelector(
    (state) => state.app.themes.updatingThemeStatus
  );
  const updatingThemeError = useSelector(
    (state) => state.app.themes.updatingThemeError
  );
  const themeToEdit = useSelector((state) => state.app.themes.themeToEdit);
  const newTheme = useSelector((state) => state.app.themes.newTheme);

  const resetForm = useCallback(() => {
    dispatch(changeCustomLinkInput("testBackgroundImageFile", ""));
    dispatch(changeCustomLinkInput("testBackgroundImage", ""));
    dispatch(changeCustomLinkInput("testThemeName", "Unnamed"));
    dispatch(changeCustomLinkInput("testBackgroundBlur", false));
    dispatch(changeCustomLinkInput("testLinkColor", "#333333"));
    dispatch(changeCustomLinkInput("testBackgroundColor", "#ffffff"));
    dispatch(changeCustomLinkInput("testTextColor", "#dddddd"));
    dispatch(changeCustomLinkInput("testBlurPercent", 0));
    dispatch(changeCustomLinkInput("testDarkPercent", 0.0));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    if (updatingThemeStatus === "success") {
      message.success("Theme Updated!");
      resetForm();
      history.goBack();
    }
    if (updatingThemeStatus === "failed") {
      message.error(updatingThemeError || "Error Updating Theme. Try Again!");
    }
    dispatch(changeThemesInput("updatingThemeStatus", "pending"));
  }, [updatingThemeStatus, updatingThemeError, dispatch, resetForm, history]);

  const [file, setFile] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (info) => {
    setFile(info.file.originFileObj);
    dispatch(
      changeCustomLinkInput(
        "testBackgroundImage",
        URL.createObjectURL(info.file.originFileObj)
      )
    );
  };
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

  const handleAddTheme = () => {
    const noChange =
      themeToEdit.color === testTextColor &&
      themeToEdit.name === testThemeName &&
      themeToEdit.blur === testBlurPercent &&
      themeToEdit.dark === testDarkPercent &&
      themeToEdit.backgroundColor === testLinkColor &&
      themeToEdit.backgroundColorImageReplace === testBackgroundColor &&
      themeToEdit.backgroundImage === testBackgroundImage &&
      themeToEdit.blured === testBackgroundBlur;
    if (noChange) {
      return message.error("No changes made!");
    }

    const formData = new FormData();
    if (themeToEdit.name !== testThemeName) {
      formData.append("name", testThemeName);
    }
    if (themeToEdit.color !== testTextColor) {
      formData.append("color", testTextColor);
    }
    if (themeToEdit.blured !== testBackgroundBlur) {
      formData.append("blured", testBackgroundBlur);
    }
    if (themeToEdit.blur !== testBlurPercent) {
      formData.append("blur", testBlurPercent);
    }
    if (themeToEdit.dark !== testDarkPercent) {
      formData.append("dark", testDarkPercent);
    }
    if (themeToEdit.backgroundColor !== testLinkColor) {
      formData.append("backgroundColor", testLinkColor);
    }
    if (themeToEdit.backgroundColorImageReplace !== testBackgroundColor) {
      formData.append("backgroundColorImageReplace", testBackgroundColor);
    }

    if (themeToEdit.backgroundImage !== testBackgroundImage) {
      if (typeof file === "object") {
        formData.append("image", file);
      } else {
        formData.append("backgroundImage", "");
      }
    }
    dispatch(updateTheme(themeToEdit._id, formData));
  };

  const handleChangeBlurPercent = (value) => {
    if (isNaN(value)) {
      return;
    }
    dispatch(changeCustomLinkInput("testBlurPercent", value));
  };
  const handleChangeDarkPercent = (value) => {
    if (isNaN(value)) {
      return;
    }
    dispatch(changeCustomLinkInput("testDarkPercent", value));
  };

  if (!themeToEdit) {
    history.goBack();
  }
  return (
    <div id='AddNewTheme'>
      <h2>
        Edit Theme <Spin spinning={updatingTheme} />
      </h2>
      <div className='appearance-box-edit-theme'>
        <div className='d-flex flex-wrap '>
          <div
            className='image-preview-box'
            style={{ backgroundImage: `url(${testBackgroundImage})` }}>
            {!testBackgroundImage && (
              <FontAwesomeIcon icon={faImage} color='#B7B4B5' size='lg' />
            )}
          </div>

          <div className='ml-md-3 ml-0 mt-md-0 mt-2'>
            <div className='d-flex flex-wrap mb-2'>
              <ImgCrop rotate>
                <Upload
                  name='profile_image'
                  listType='picture-card'
                  showUploadList={false}
                  onPreview={onPreview}
                  onChange={handleChange}>
                  <AppButton text='Pick an Image' />
                </Upload>
              </ImgCrop>
              <AppButton
                className='align-self-start ml-2'
                text='Remove'
                inverse
                onCLick={() => {
                  dispatch(changeCustomLinkInput("testBackgroundImage", null));
                  setFile("");
                }}
              />
            </div>
            <CustomInput
              placeholder='Theme name'
              defaultValue={testThemeName}
              onChange={(e) => {
                dispatch(
                  changeCustomLinkInput("testThemeName", e.target.value)
                );
              }}
              id='testThemeName'
            />
          </div>
        </div>

        <p className='link-small mt-3'>Blur </p>
        <Row>
          <Col span={12}>
            <Slider
              min={0}
              max={10}
              onChange={handleChangeBlurPercent}
              value={typeof testBlurPercent === "number" ? testBlurPercent : 0}
              step={1}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={10}
              style={{ margin: "0 16px" }}
              step={1}
              value={testBlurPercent}
              onChange={handleChangeBlurPercent}
            />
          </Col>
        </Row>
        <p className='link-small'>Darken filter </p>
        <Row>
          <Col span={12}>
            <Slider
              min={0}
              max={1}
              onChange={handleChangeDarkPercent}
              value={typeof testDarkPercent === "number" ? testDarkPercent : 0}
              step={0.01}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={1}
              style={{ margin: "0 16px" }}
              step={0.01}
              value={testDarkPercent}
              onChange={handleChangeDarkPercent}
            />
          </Col>
        </Row>

        <div className='d-flex flex-wrap'>
          <div className='my-2'>
            <p className='link-small'>Pick link colour</p>
            <div className='d-flex'>
              <input
                type='color'
                className='color-box'
                name='text-color'
                id='text-color'
                defaultValue={testLinkColor}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    changeCustomLinkInput("testLinkColor", e.target.value)
                  );
                }}
              />
              <div className='color-value-box'>
                <span className='link-small'>{testLinkColor}</span>
              </div>
            </div>
          </div>
          <div className='ml-md-3 my-2'>
            <p className='link-small'>Pick Text colour</p>
            <div className='d-flex'>
              <input
                type='color'
                className='color-box'
                name='text-color'
                id='text-color-2'
                defaultValue={testTextColor}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    changeCustomLinkInput("testTextColor", e.target.value)
                  );
                }}
              />
              <div className='color-value-box'>
                <span className='link-small'>{testTextColor}</span>
              </div>
            </div>
          </div>
          <div className='my-2'>
            <p className='link-small'>Pick Background colour</p>
            <div className='d-flex'>
              <input
                type='color'
                className='color-box'
                name='text-color'
                id='text-color-2'
                defaultValue={testBackgroundColor}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    changeCustomLinkInput("testBackgroundColor", e.target.value)
                  );
                }}
              />
              <div className='color-value-box'>
                <span className='link-small'>{testBackgroundColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex my-3'>
          <AppButton
            text='Back'
            inverse
            onCLick={() => history.goBack()}
            disabled={updatingTheme}
          />
          <AppButton
            text={
              updatingTheme ? (
                <Spin
                  indicator={antIcon}
                  className='text-white'
                  spinning={updatingTheme}
                />
              ) : (
                "Save Theme"
              )
            }
            className='ml-2'
            onCLick={handleAddTheme}
            disabled={updatingTheme}
          />
        </div>
      </div>

      <Modal
        title={null}
        visible={isModalVisible}
        closeIcon
        footer={null}
        onCancel={() => setIsModalVisible(false)}>
        <div className='text-center'>
          <FontAwesomeIcon icon={faCheckCircle} color='green' size='4x' />
          <p className='text-small my-2'>New Theme added</p>
          <p className='text-large my-2 mb-3'>Select as default?</p>
          <div className='d-flex justify-content-center'>
            <AppButton
              text='No, go back'
              inverse
              className='mx-2'
              disabled={updatingUserProfile}
              onCLick={() => {
                setIsModalVisible(false);
                history.goBack();
              }}
            />
            <AppButton
              text={
                updatingUserProfile ? (
                  <Spin spinning={updatingUserProfile} size='small' />
                ) : (
                  "Yes"
                )
              }
              className='mx-2'
              onCLick={() => {
                dispatch(updateUserProfile({ theme: newTheme._id }));
              }}
              disabled={updatingUserProfile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
