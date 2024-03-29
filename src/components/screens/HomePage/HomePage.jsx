/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeAuthInput,
  checkUserNameAvailability,
  getLoggedInUser,
} from "../../../store/authSlice";
import "./css/style.css";
import Group1000001632 from "../../../assets/images/Group1000001632.svg";
import Group1000001664 from "../../../assets/images/Group1000001664.svg";
import Group1000001669 from "../../../assets/images/Group1000001669.svg";
import Flutterwave from "../../../assets/images/Flutterwave.svg";
import StoreAds4 from "../../../assets/images/StoreAds4.svg";
import StoreAds2 from "../../../assets/images/StoreAds2.svg";
import StoreAd1 from "../../../assets/images/StoreAd1.svg";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import MonalyLogoWhite from "../../../assets/images/MonalyLogoWhite.svg";
import SectionOne5 from "../../../assets/images/SectionOne5.svg";
import SectionOne4 from "../../../assets/images/SectionOne4.svg";
import SectionOne3 from "../../../assets/images/SectionOne3.svg";
import SectionOne2 from "../../../assets/images/SectionOne2.svg";
import SectionOne1 from "../../../assets/images/SectionOne1.svg";
import picp from "../../../assets/images/picp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faDollarSign,
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

const HomePage = (props) => {
  ReactGA.initialize("G-7BE731M1W9");
  ReactGA.pageview(window.location.pathname + window.location.search);
  const loggedInUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Monaly | Home Page";
  }, []);

  const status = useSelector((state) => state.app.user.userName.status);
  const loading = useSelector((state) => state.app.user.userName.loading);
  const signUpUserName = useSelector((state) => state.app.user.signUpUserName);

  const BoldItem = ({ text, comingSoon = false }) => {
    return (
      <li className='marked-list-item link-small'>
        {text}{" "}
        {comingSoon && (
          <span class='badge rounded-pill bg-primary'>coming soon</span>
        )}
      </li>
    );
  };
  const BoldMutedItem = ({ text, comingSoon = false }) => {
    return (
      <li className='marked-list-item text-muted link-small'>
        {text}{" "}
        {comingSoon && (
          <span class='badge rounded-pill bg-primary'>coming soon</span>
        )}
      </li>
    );
  };
  const MarkedListItem = ({ text, comingSoon = false }) => {
    return (
      <li className='marked-list-item text-medium my-2'>
        {text}{" "}
        {comingSoon && (
          <span class='badge rounded-pill bg-primary'>coming soon</span>
        )}
      </li>
    );
  };

  if (loggedInUser) {
    window.location = "/dashboard";
  }

  return (
    <div id='homepage'>
      <nav className='d-flex align-items-center justify-content-between p-3  bg-light '>
        <li className='mx-2'>
          <Link to='/'>
            <img src={monaly_logo} height='25px' alt='' />
          </Link>
        </li>
        <li className='mx-2 hide-900'>
          <a href='#pricing' className='link-x-small'>
            Pricing
          </a>
        </li>
        <li className='mx-2 hide'>
          <Link to='/help' className='link-x-small'>
            Help
          </Link>
        </li>
        {/* {loggedInUser && (
          <li className="ml-auto mr-3">
            <Link to="/money" className="link-x-small">
              Store
            </Link>
          </li>
        )} */}
        {loggedInUser && (
          <li className='ml-auto mr-3'>
            <Link to='/dashboard' className='link-x-small'>
              Dashboard
            </Link>
          </li>
        )}
        {!loggedInUser && (
          <li className='ml-auto'>
            <Link to='/sign-in' className='link-x-small'>
              Login
            </Link>
          </li>
        )}
        {!loggedInUser && (
          <li className='mx-2'>
            <Link
              to='/sign-up'
              className='primary-btn custom-btn-sm link-x-small'>
              SIGN UP FREE
            </Link>
          </li>
        )}
      </nav>

      <section id='hompageSectionOne' className='bg-light'>
        <div className='container py-md-5 py-3'>
          <div className='row align-items-center'>
            <div className='col-md-7 col-12 p-3'>
              <h1 className='display-large-bold mb-3'>
                Start sharing and selling in seconds.
              </h1>
              <ul>
                <MarkedListItem
                  text=' Get a link with all your important contents in seconds to
                  share with your audience.'
                />
                <MarkedListItem
                  text='Set up an e-commerce store and start selling.'
                  comingSoon
                />
              </ul>
              <form
                className='rounded-pill border d-flex justify-content-between p-2 mt-5 mb-3 align-items-center bg-white'
                onSubmit={(e) => {
                  e.preventDefault();
                  props.history.push("/sign-up");
                }}>
                <span className='link-small ml-3'>monaly.co/</span>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='w-100 bg-transparent border-0 text-small'
                  autoFocus
                  defaultValue={signUpUserName}
                  onChange={(e) => {
                    dispatch(changeAuthInput("signUpUserName", e.target.value));
                    if (e.target.value && e.target.value.length > 0) {
                      dispatch(checkUserNameAvailability(e.target.value));
                    }
                  }}
                  placeholder='username'
                  required={true}
                />
                <input
                  type='submit'
                  value='Create Link'
                  className='primary-btn custom-btn-sm'
                />
              </form>
              {status && (
                <div style={{ display: "flex", margin: 0 }}>
                  {loading && (
                    <div
                      class='spinner-border spinner-border-sm monaly-primary'
                      role='status'>
                      <span class='visually-hidden'>Loading...</span>
                    </div>
                  )}
                  {status && signUpUserName && (
                    <span
                      style={{
                        color: status && status.color,
                      }}
                      className='notify-p'>
                      &nbsp; {status && status.message}
                    </span>
                  )}
                </div>
              )}
              <ul className='my-2 text-x-small'>
                <li className='d-inline'>Free trial</li>
                <li className='d-inline-block ml-3'>Easy setup</li>
                <li className='d-inline-block ml-3'>Cancel any time</li>
              </ul>
            </div>
            <div className='col-md-5 col-12 my-3'>
              <div className='homepage-moving-images'>
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
          <div className='my-4 text-center'>
            <p className='text-medium'>
              Powered by some of the best technologies
            </p>
            <div className='d-flex justify-content-around flex-wrap '>
              <div className=' text-center my-3'>
                <a
                  href='https://flutterwave.com/'
                  target='_blank'
                  rel='noreferrer'>
                  <img src={Flutterwave} height='30px' alt='' />
                </a>
              </div>

              {/* <div className=" text-center my-3">
                <img src={NikeLogo} height="30px" alt="" />
              </div>
              <div className=" text-center my-3">
                <img src={NetgeoLogo} height="30px" alt="" />
              </div>
              <div className=" text-center my-3">
                <img src={IndustriousLogo} height="30px" alt="" />
              </div>
              <div className=" text-center my-3">
                <img src={FlorenceLogo} height="30px" alt="" />
              </div>
              <div className=" text-center my-3">
                <img src={AncestryLogo} height="30px" alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section id='hompageSectionTwo' className='bg-white'>
        <div className='container py-5 my-5'>
          <div className='row align-items-center'>
            <div className='col-md-6 col-12 stripe-bg order-md-0 order-2'>
              <img
                src={Group1000001632}
                alt='monaly products'
                width='100%'
                height='400px'
              />
            </div>
            <div className='col-md-6 col-12 order-0  mb-3'>
              <h1 className='display-medium-bold  mb-3'>
                Create a beautiful landing page in minutes.
              </h1>
              <ul>
                <MarkedListItem text='no code required' />
                <MarkedListItem text='create beautiful landing page in seconds' />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='homepageSectionThree' className='bg-white py-5 text-center'>
        <div className='container-fluid'>
          <div className='row justify-content-around'>
            <h1 className='display-medium-bold col-md-6 col-12'>
              Create an ecommerce page and sell stuff
            </h1>
          </div>
          <div className='d-flex  justify-content-center my-3 ads'>
            <div className='e-ad-card e-ad-card-1 m-3'>
              <img src={StoreAd1} alt='' />
              <div className='d-flex align-items-center mt-2 w-100 justify-content-center'>
                <div className='icon-wrap'>
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
                <span className='text-medium ml-1 '>Setup a store</span>
              </div>
            </div>
            <div className='e-ad-card e-ad-card-2 m-3'>
              <div className='img'>
                <img src={StoreAds2} alt='' />
              </div>
              <div className='d-flex align-items-center mt-2 w-100 justify-content-center'>
                <div className='icon-wrap'>
                  <FontAwesomeIcon icon={faDollarSign} />
                </div>
                <span className='text-medium ml-1 '>Recieve Payment</span>
              </div>
            </div>
            <div className='e-ad-card e-ad-card-3 m-3'>
              <img src={StoreAd1} alt='' />
              <div className='d-flex align-items-center mt-2 w-100 justify-content-center '>
                <div className='icon-wrap'>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <span className='text-medium ml-1 '>
                  Buy from verified sellers{" "}
                </span>
              </div>
            </div>
            <div className='e-ad-card e-ad-card-4 m-3'>
              <img src={StoreAds4} alt='' />
              <div className='d-flex align-items-center mt-2 w-100 justify-content-center'>
                <div className='icon-wrap'>
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <span className='text-medium ml-1 '>
                  {" "}
                  Get a refund on verified products
                </span>
              </div>
            </div>
          </div>
        </div>{" "}
      </section>

      <section id='hompageSectionTwo' className='bg-white'>
        <div className='container py-5 my-5'>
          <div className='row align-items-center'>
            <div className='col-md-6 col-12'>
              <h1 className='display-medium-bold mb-3'>
                Get your audience to your important links
              </h1>
              <ul>
                <MarkedListItem text='Add links to your contents' />
                <MarkedListItem text='Add links to your social media pages' />
                <MarkedListItem text='All on a single page' />
              </ul>
            </div>

            <div className='col-md-6 col-12'>
              <img
                src={Group1000001664}
                alt='monaly products'
                width='100%'
                height='400px'
              />
            </div>
          </div>
        </div>
      </section>

      <section id='hompageSectionTwo' className='bg-white'>
        <div className='container py-5 my-5'>
          <div className='row align-items-center'>
            <div className='col-md-6 col-12 '>
              <img
                src={Group1000001669}
                alt='monaly products'
                width='100%'
                height='400px'
              />
            </div>
            <div className='col-md-6 col-12 '>
              <h1 className='display-medium-bold my-4'>
                Manage analytics of your social media
              </h1>
              <ul>
                <MarkedListItem text='measure how audience view and click your contents.' />
                <MarkedListItem
                  text=' See countries where people are viewing and clicking your
                  contents.'
                  comingSoon
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='pricing' className='bg-light py-5 '>
        <div className='conatiner '>
          <h1 className='display-medium-bold text-center'>
            Try monaly PRO features 7 days free.
          </h1>
          <p className='text-large text-center'>
            Reach more with your monaly links.
          </p>
          <div className='d-flex justify-content-center align-items center my-2 flex-wrap'>
            <div className='pricing-card-wrap  m-3'>
              <div className='pricing-card  p-3'>
                <h1 className='display-small-bold'>FREE</h1>
                <h1 className='display-small-bold'>
                  $0<span className='text-small'>/month</span>
                </h1>
                <Link to='/sign-up' className='w-100 primary-inverse-btn my-4'>
                  Start Using For Free
                </Link>
                <ul>
                  <BoldItem text='Add unlimited links' />
                  <BoldMutedItem text='Add images to links' />
                  <BoldMutedItem text='Add social icons' />
                  <BoldMutedItem text='Add bio' />
                  {/* <BoldMutedItem text='Share link with friends using QR code' /> */}
                  <BoldMutedItem text='Add an e-commerce store' comingSoon />
                  <BoldMutedItem text='Get orders on the App' comingSoon />
                  <BoldMutedItem text='Get payment from customers' comingSoon />
                  <BoldMutedItem
                    text='Link with dispatch riders to deliver your product'
                    comingSoon
                  />
                </ul>
              </div>
              {/* <p className="text-x-small text-muted mt-3">
                You can also refer your friends to get monaly points and monaly
                points can be used to subscribe for PRO for a limited time.
              </p> */}
            </div>

            <div className='pricing-card monaly-border p-3 m-3'>
              <h1 className='display-small-bold'>PRO</h1>
              <h1 className='display-small-bold'>
                $5<span className='text-small'>/month</span>
              </h1>
              <Link to='sign-up' className='w-100 primary-btn my-4 p-4'>
                Join the PROs
              </Link>
              <ul>
                <BoldItem text='Add multiple monaly accounts⁣' />
                <BoldMutedItem text='Get analytics of daily, weekly and monthly views of your profile⁣' />
                <BoldMutedItem text='Get analytics of daily, weekly and monthly click of your links' />
                <BoldMutedItem text='Get analytics of countries where your profile is getting attention' />
                <BoldMutedItem text='Get analytics of devices from which your profile is getting attention' />
                <BoldMutedItem text='Download data of analytics' />
                <BoldMutedItem text='Get analytics of clicks on individual links.' />
                <BoldMutedItem text='Download and Collect subscribers data' />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='homepageSectionFive' className='py-5 my-5 hide'>
        <div className='container-fluid'>
          <h1 className='display-large-bold text-center '>
            What people are saying about us
          </h1>
          <div className=' my-5'>
            <div className='d-flex testimony-box py-3 '>
              <TestimonyCard
                image={picp}
                heading='Terry Dias'
                text='I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders...'
                className='rad-top-left-0 rad-bottom-right-0'
              />
              <TestimonyCard
                image={picp}
                heading='Terry Dias'
                text='I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders...'
              />
              <TestimonyCard
                image={picp}
                heading='Terry Dias'
                text='I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders...'
              />
              <TestimonyCard
                image={picp}
                heading='Terry Dias'
                text='I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders...'
                className='rad-top-right-0 rad-bottom-left-0'
              />
            </div>
          </div>
        </div>{" "}
      </section>

      <footer className='text-white py-5 hide'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-12 my-3'>
              <Link to='/'>
                <img src={MonalyLogoWhite} height='40px' alt='' />
              </Link>
              <div className='text-small text-white mt-3'>
                monaly inc brings you to the world by using links to advertise
                your products and business.
              </div>
            </div>

            <div className='col-md-2 col-12 my-3'>
              <div className='link-small text-white'>Product</div>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Reviews management
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Embed Instagram stories
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Display Instagram feeds
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Collect reviews
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Send email requests
                </Link>
              </p>
            </div>

            <div className='col-md-2 col-12 my-3'>
              <div className='link-small text-white'>Company</div>

              <p>
                <Link to='/' className='text-x-small text-white'>
                  About EmbedSocial
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Brand Guidelines
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Press Kit
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Support
                </Link>
              </p>
            </div>

            <div className='col-md-2 col-12 my-3'>
              <div className='link-small text-white'>Integrations</div>

              <p>
                <Link to='/' className='text-x-small text-white'>
                  WordPress
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Shopify
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Magento
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Squarespace
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Intercom
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Slack
                </Link>
              </p>
            </div>

            <div className='col-md-2 col-12 my-3'>
              <div className='link-small text-white'>Integrations</div>

              <p>
                <Link to='/' className='text-x-small text-white'>
                  WordPress
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Shopify
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Magento
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Squarespace
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Intercom
                </Link>
              </p>
              <p>
                <Link to='/' className='text-x-small text-white'>
                  Slack
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TestimonyCard = ({ image, heading, text, className }) => {
  return (
    <div className={`testimony-card ${className}`}>
      <div
        className='avatar mb-3'
        style={{ backgroundImage: `url(${image})` }}></div>
      <p className='link-x-small monaly-primary'>{heading}</p>
      <p className='text-x-small '>{text}</p>
    </div>
  );
};
export default HomePage;
