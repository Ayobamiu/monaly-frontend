/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import AppButton from "../../includes/AppButton/AppButton";
// import { Select, Spin } from "antd";
// import debounce from "lodash/debounce";
// import CustomDebounceSelect from "./DebounceSelect";
export default function AddEmailRecepients() {
  return (
    <div>
      <div className='py-5 text-center container'>
        <h1 className='header-p mb-5'>Send To</h1>

        <NavLink to='/admin/compose-email'>
          <AppButton text='All Users' className='mx-auto' large />
        </NavLink>
        <p className='text-x-small my-3'>
          Send to all Monaly registered users.
        </p>

        <h1>Or</h1>
        <p className='text-x-small my-3'>Emails separated with commas</p>
        <textarea
          name='emails'
          id='emails'
          cols='40'
          rows='6'
          className='my-2'></textarea>
        {/* <CustomDebounceSelect /> */}
        <NavLink to='/admin/compose-email'>
          <AppButton
            text='Use this email list'
            className='mx-auto'
            large
            inverse
          />
        </NavLink>
      </div>
    </div>
  );
}
