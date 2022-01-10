/** @format */

import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import AppButton from "../../includes/AppButton/AppButton";
import "./style.css";

export default function SelectEmailType() {
  return (
    <div className='' id='selectEmailScreen'>
      <div className='selectEmailScreenBox container'>
        <div className='d-flex justify-content-between align-items-start'>
          <h1 className='header-p mb-5'>Select Email Type</h1>
          <NavLink to='/admin/draft-emails'>
            <div className='badge bg-light p-3 rounded-pill m-1 cursor '>
              <span className='link-x-small'>Go to Drafts </span>
              <FontAwesomeIcon
                icon={faSave}
                className='text-secondary'
                size='lg'
              />
            </div>
          </NavLink>
        </div>

        <NavLink to='/admin/email-recipients'>
          <AppButton text='General' className='mx-auto' fullWidth large />
        </NavLink>
        <p className='text-x-small my-3'>
          General Emails are sent without personal salutation, in most cases,
          they start with "Hello user", noting personalized. Holiday
          notification is an example of General Email.
        </p>
        <NavLink to='/admin/email-recipients'>
          <AppButton
            text='Personalized'
            className='mx-auto'
            fullWidth
            large
            inverse
          />
        </NavLink>
        <p className='text-x-small my-3'>
          Personalized Emails are sent with personal salutation, in most cases,
          they start with "Hello (username)", and includes user details in the
          body.
        </p>
      </div>
    </div>
  );
}
