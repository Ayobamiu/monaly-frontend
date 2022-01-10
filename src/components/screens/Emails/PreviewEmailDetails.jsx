/** @format */

import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function PreviewEmailDetails() {
  let emailList = [];
  for (let index = 0; index < 50; index++) {
    emailList.push(index);
  }
  const [showAll, setShowAll] = useState(false);
  const minView = 10;
  const [showing, setShowing] = useState(minView);
  return (
    <div className='container py-5'>
      <div className='d-flex  align-items-start'>
        <p className='header-p'>Preview</p>
        <div className='ms-auto'>
          <div className='badge bg-light p-3 rounded-pill m-1 cursor '>
            <span className='link-x-small'>Schedule </span>
            <FontAwesomeIcon
              icon={faClock}
              className='text-secondary'
              size='lg'
            />
          </div>
          <div className='badge bg-light p-3 rounded-pill m-1 cursor '>
            <span className='link-x-small'>Send </span>
            <FontAwesomeIcon
              icon={faEnvelope}
              className='text-secondary'
              size='lg'
            />
          </div>
        </div>
      </div>
      <div className='preview-box my-3'>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='text-large'>Subject</p>
          <NavLink to='/admin/compose-email'>
            <div className='avatar sm bg-light cursor'>
              <FontAwesomeIcon icon={faPen} className='text-secondary' />
            </div>
          </NavLink>
        </div>
        <p className='text-small'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
          ratione eos excepturi iusto odio. Culpa repudiandae iusto, vel aperiam
          iure aspernatur corrupti dignissimos, molestiae impedit eveniet
          reiciendis voluptatem optio beatae?
        </p>
      </div>
      <div className='preview-box my-3'>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='text-large'>Reciepents</p>
          <NavLink to='/admin/email-recipients'>
            <div className='avatar sm bg-light cursor'>
              <FontAwesomeIcon icon={faPen} className='text-secondary' />
            </div>
          </NavLink>
        </div>
        <div className='d-flex flex-wrap'>
          {emailList.slice(0, showing).map((email) => (
            <div className='badge bg-light p-2 px-3 rounded-pill m-1'>
              <span className='text-x-small'>email@email.com</span>
            </div>
          ))}
          {!showAll && (
            <div
              className='badge bg-light p-2 px-3 rounded-pill m-1 cursor'
              onClick={() => {
                setShowing(emailList.length);
                setShowAll(true);
              }}>
              <span className='text-x-small text-success'>
                <FontAwesomeIcon icon={faPlus} /> {emailList.length - minView}{" "}
                others...
              </span>
            </div>
          )}
          {showAll && showing > minView && (
            <div
              className='badge bg-light p-2 px-3 rounded-pill m-1 cursor'
              onClick={() => {
                setShowing(minView);
                setShowAll(false);
              }}>
              <span className='text-x-small text-success'>Show less...</span>
            </div>
          )}
        </div>
      </div>
      <div className='preview-box my-3'>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='text-large'>Body</p>
          <NavLink to='/admin/compose-email'>
            <div className='avatar sm bg-light cursor'>
              <FontAwesomeIcon icon={faPen} className='text-secondary' />
            </div>
          </NavLink>
        </div>
        <p className='text-small'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
          ratione eos excepturi iusto odio. Culpa repudiandae iusto, vel aperiam
          iure aspernatur corrupti dignissimos, molestiae impedit eveniet
          reiciendis voluptatem optio beatae?Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Repellat ab autem saepe vel ex eius
          quaerat dicta! Facere perspiciatis atque officiis consequatur vitae
          optio dolorum. Repudiandae quae recusandae quas adipisci!
        </p>
      </div>
    </div>
  );
}
