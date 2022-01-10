/** @format */

import React from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import AppButton from "../../includes/AppButton/AppButton";
import CustomInput from "../../includes/CustomInput/CustomInput";
import { NavLink } from "react-router-dom";
export default function ComposeEmailScreen() {
  return (
    <div>
      <div className='ComposeEmailScreenBox' id='editor'>
        <p className='header-p'>Compose Email</p>
        <CustomInput placeholder='Subject' id='subject' />
        <br />
        <FroalaEditorComponent tag='textarea' />
        <div className='d-flex justify-content-center my-5'>
          <NavLink to='/admin/draft-emails'>
            <AppButton text='Save as Draft' className='mx-2' inverse />
          </NavLink>
          <NavLink to='/admin/preview-email'>
            <AppButton text='Preview' className='mx-2' />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
