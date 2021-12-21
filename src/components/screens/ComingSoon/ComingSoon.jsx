/** @format */

import React, { useEffect, useState } from "react";
import SectionOne5 from "../../../assets/images/SectionOne5.svg";
import SectionOne4 from "../../../assets/images/SectionOne4.svg";
import SectionOne3 from "../../../assets/images/SectionOne3.svg";
import SectionOne2 from "../../../assets/images/SectionOne2.svg";
import SectionOne1 from "../../../assets/images/SectionOne1.svg";
import monaly_logo from "../../../assets/images/monaly_logo.svg";

import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Countdown from "react-countdown";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToWaitingList,
  changeAuthInput,
} from "../../../store/authSlice";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const addingToWaitList = useSelector(
    (state) => state.app.user.addingToWaitList
  );
  const addToWaitiListStatus = useSelector(
    (state) => state.app.user.addToWaitiListStatus
  );
  useEffect(() => {
    if (addToWaitiListStatus === "success") {
      message.success("🤝 Done, we will notify you when we launch!");
    }
    if (addToWaitiListStatus === "failed") {
      message.error("Something went wrong. Try again!");
    }
    dispatch(changeAuthInput("addToWaitiListStatus", "pending"));
  }, [addToWaitiListStatus, dispatch]);
  console.log("addingToWaitList", addingToWaitList);
  console.log("addToWaitiListStatus", addToWaitiListStatus);
  return (
    <div>
      <section id='comingSoonSectionOne' className='bg-light'>
        <nav className='d-flex align-items-center justify-content-between p-3  bg-white border-bottom '>
          <li className='mx-2'>
            <img src={monaly_logo} height='25px' alt='' />
          </li>
          <li className='mx-2  ml-auto'>
            <a href='mailto:contact@monaly.co' className='link-x-small'>
              Contact us
            </a>
          </li>
          <li className='mx-2 '>
            <a href='mailto:contact@monaly.co' className='link-x-small'>
              <button className='link-x-small primary-btn-inverse custom-btn-xsm px-4'>
                Help
              </button>
            </a>
          </li>
        </nav>
        <div className='container py-md-5 py-3'>
          <div className='row align-items-center '>
            <div className='col-md-7 col-12 p-3'>
              <Countdown
                date={new Date("2021-12-26T01:02:03")}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <div className='countItemBox'>
                    <div className='countItem'>
                      <h1>{days}</h1>
                      <span className='link-x-small'>DAYS</span>
                    </div>
                    <div className='countItem'>
                      <h1>{hours}</h1>
                      <span className='link-x-small'>HOURS</span>
                    </div>
                    <div className='countItem '>
                      <h1>{minutes}</h1>
                      <span className='link-x-small'>MINUTES</span>
                    </div>
                    <div className='countItem '>
                      <h1 className='minusSign'>{seconds}</h1>
                      <span className='link-x-small'>SECONDS</span>
                    </div>
                  </div>
                )}
              />
              <h1 className='display-large-bold mb-3'>
                Get notified when we launch.{" "}
                <Spin spinning={addingToWaitList} />
              </h1>

              <form
                className='rounded-pill border d-flex justify-content-between p-2 mt-5 mb-3 align-items-center bg-white '
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(addUserToWaitingList(email));
                }}>
                <input
                  type='email'
                  name='email'
                  id='email'
                  about='Email Address'
                  className='w-100 bg-transparent border-0 text-small pl-2 outline-none'
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder='Enter your email address'
                  required={true}
                />
                <input
                  type='submit'
                  value='Notify me'
                  className='primary-btn custom-btn-sm'
                  disabled={addingToWaitList}
                />
              </form>
              <p className=' text-x-small'>Don’t worry, we won’t spam you</p>
            </div>
            <div className='col-md-5 col-12 my-3'>
              <div className='comingsoon-moving-images'>
                <img
                  src={SectionOne1}
                  alt='SectionOne1'
                  className='SectionOne1'
                />
                <img
                  src={SectionOne2}
                  alt='SectionOne2'
                  className='SectionOne2'
                />
                <img
                  src={SectionOne3}
                  alt='SectionOne3'
                  className='SectionOne3'
                />
                <img
                  src={SectionOne4}
                  alt='SectionOne4'
                  className='SectionOne4'
                />
                <img
                  src={SectionOne5}
                  alt='SectionOne5'
                  className='SectionOne5'
                />
              </div>
            </div>
          </div>

          <div className='d-flex'>
            <a
              href='https://instagram.com/usemonaly?utm_medium=copy_link'
              className='iconBadge'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href='https://vm.tiktok.com/ZM83mNkHU/' className='iconBadge'>
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            {/* <a href='https://vm.tiktok.com/ZM83mNkHU/' className='iconBadge'>
              <FontAwesomeIcon icon={faFacebookF} />
            </a> */}
            <a href='https://twitter.com/usemonaly?s=21' className='iconBadge'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
