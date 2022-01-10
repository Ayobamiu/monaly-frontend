/** @format */

import React, { useEffect } from "react";
import { Drawer, Form, Col, Row, Input, Space, message, Spin } from "antd";
import AppButton from "../AppButton/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { changeThemesInput, updateTheme } from "../../../store/themeSlice";

export default function RenameTheme({ visible, toggleModal, theme }) {
  const dispatch = useDispatch();
  const updatingTheme = useSelector((state) => state.app.themes.updatingTheme);
  const updatingThemeStatus = useSelector(
    (state) => state.app.themes.updatingThemeStatus
  );
  const updatingThemeError = useSelector(
    (state) => state.app.themes.updatingThemeError
  );
  useEffect(() => {
    if (updatingThemeStatus === "success") {
      toggleModal();
      message.success("Name Updated!");
    }
    if (updatingThemeStatus === "failed") {
      message.error(updatingThemeError || "Error Adding Theme. Try Again!");
    }
    dispatch(changeThemesInput("updatingThemeStatus", "pending"));
  }, [updatingThemeStatus, updatingThemeError, dispatch, toggleModal]);

  return (
    <>
      <Drawer
        title='Rename Theme'
        width='100%'
        onClose={toggleModal}
        extra={
          <Space>
            <AppButton
              text='Cancel'
              inverse
              onClick={toggleModal}
              disabled={updatingTheme}
              htmlType='button'
            />
          </Space>
        }
        visible={visible}>
        <Form
          layout='vertical'
          hideRequiredMark
          wrapperCol
          onFinish={(values) => {
            if (values.name === theme.name) {
              message.warning("No Changes made!");
              toggleModal();
            } else {
              dispatch(updateTheme(theme._id, { name: values.name }));
            }
          }}
          initialValues={{ name: theme?.name }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name='name'
                label='Update Theme Name'
                rules={[
                  { required: true, message: "Please enter Theme name" },
                ]}>
                <Input placeholder='Theme name' />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Form.Item wrapperCol={{ span: 16 }} style={{ padding: 0 }}>
              <AppButton
                text={
                  updatingTheme ? (
                    <Spin size='small' spinning={updatingTheme} />
                  ) : (
                    "Save"
                  )
                }
                htmlType='submit'
                disabled={updatingTheme}
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
}
