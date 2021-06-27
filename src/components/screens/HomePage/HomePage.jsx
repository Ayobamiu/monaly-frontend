import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  changeAuthInput,
  checkUserNameAvailability,
  getLoggedInUser,
  logUserOut,
} from "../../../store/authSlice";
import "./css/style.css";
import Group1000001659 from "../../../assets/images/Group1000001659.svg";
import Group1000001632 from "../../../assets/images/Group1000001632.svg";
import Group1000001664 from "../../../assets/images/Group1000001664.svg";
import Group1000001669 from "../../../assets/images/Group1000001669.svg";
import NikeLogo from "../../../assets/images/NikeLogo.svg";
import NetgeoLogo from "../../../assets/images/NetgeoLogo.svg";
import IndustriousLogo from "../../../assets/images/IndustriousLogo.svg";
import FlorenceLogo from "../../../assets/images/FlorenceLogo.svg";
import AncestryLogo from "../../../assets/images/AncestryLogo.svg";
import CNNLogo from "../../../assets/images/CNNLogo.svg";
import shoppingbag from "../../../assets/images/shopping-bag.svg";
import CreditCard from "../../../assets/images/CreditCard.svg";
import ShoppingCart from "../../../assets/images/ShoppingCart.svg";
import DollarSign from "../../../assets/images/DollarSign.svg";
import monaly_logo from "../../../assets/images/monaly_logo.svg";
import MonalyLogoWhite from "../../../assets/images/MonalyLogoWhite.svg";
import picp from "../../../assets/images/picp.jpg";

const HomePage = (props) => {
  const loggedInUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Monaly | Home Page";
  }, []);

  const status = useSelector((state) => state.app.user.userName.status);
  const loading = useSelector((state) => state.app.user.userName.loading);
  const signUpUserName = useSelector((state) => state.app.user.signUpUserName);

  console.log(props);
  return (
    <div id="homepage">
      <nav className="d-flex align-items-center justify-content-between py-3 px-0 bg-white ">
        <li className="mx-4">
          <Link to="/">
            <img src={monaly_logo} height="25px" alt="" />
          </Link>
        </li>
        <li className="mx-4 hide-900">
          <a href="#pricing" className="link-x-small">
            Pricing
          </a>
        </li>
        <li className="mx-4 hide-900">
          <Link to="/help" className="link-x-small">
            Help
          </Link>
        </li>
        {loggedInUser && (
          <li className="ml-auto mr-3">
            <Link to="/dashboard" className="link-x-small">
              Dashboard
            </Link>
          </li>
        )}
        {!loggedInUser && (
          <li className="ml-auto">
            <Link to="/sign-in" className="link-x-small">
              Login
            </Link>
          </li>
        )}
        {!loggedInUser && (
          <li className="mx-4">
            <Link
              to="/sign-up"
              className="primary-btn custom-btn-sm link-x-small"
            >
              SIGN UP FREE{" "}
            </Link>
          </li>
        )}
      </nav>

      <section id="hompageSectionOne" className="bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <h1 className="display-large-bold">
                Start sharing and selling in seconds.
              </h1>
              <ul>
                <li className="marked-list-item text-medium">
                  Get a link with all your important contents in seconds to
                  share with your audience.
                </li>
                <li className="marked-list-item text-medium">
                  Set up an e-commerce store and start selling.
                </li>
              </ul>
              <form
                className="rounded-pill border d-flex justify-content-between p-1 mt-5 align-items-center bg-white"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.history.push("/sign-up");
                }}
              >
                <span className="link-small ml-3">mona.ly/</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-100 bg-transparent border-0 text-small"
                  autoFocus
                  defaultValue={signUpUserName}
                  onChange={(e) => {
                    dispatch(changeAuthInput("signUpUserName", e.target.value));
                    if (e.target.value && e.target.value.length > 0) {
                      dispatch(checkUserNameAvailability(e.target.value));
                    }
                  }}
                  placeholder="username"
                  type="text"
                  required={true}
                />
                <input
                  type="submit"
                  value="Create Link"
                  className="primary-btn custom-btn-sm"
                />
              </form>
              {status && (
                <div style={{ display: "flex", margin: 0 }}>
                  {loading && (
                    <div
                      class="spinner-border spinner-border-sm monaly-primary"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {status && signUpUserName && (
                    <span
                      style={{
                        color: status && status.color,
                      }}
                      className="notify-p"
                    >
                      &nbsp; {status && status.message}
                    </span>
                  )}
                </div>
              )}
              <ul className="my-2 text-x-small">
                <li className="d-inline">Free 7-day trial</li>
                <li className="d-inline-block ml-3">Easy setup</li>
                <li className="d-inline-block ml-3">Cancel any time</li>
              </ul>
            </div>
            <div className="col-md-6 col-12">
              <img src={Group1000001659} alt="monaly products" width="100%" />
            </div>
          </div>
          <div className="my-4 text-center">
            <p className="text-medium">
              Join 50.000+ websites that use monaly to sell more
            </p>
            <div className="d-flex justify-content-around flex-wrap">
              <div className=" text-center my-3">
                <img src={CNNLogo} height="30px" alt="" />
              </div>
              <div className=" text-center my-3">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hompageSectionTwo" className="bg-white">
        <div className="container py-5 my-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-12 stripe-bg">
              <img
                src={Group1000001632}
                alt="monaly products"
                width="100%"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-12">
              <h1 className="display-medium-bold">
                Create a beautiful landing page in minutes.
              </h1>
              <ul>
                <li className="marked-list-item text-medium">
                  no code required
                </li>
                <li className="marked-list-item text-medium">
                  create beautiful landing page in seconds
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="homepageSectionThree" className="bg-light py-5 text-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h1 className="display-medium-bold col-md-6 col-12">
              Create an ecommerce page and sell stuff
            </h1>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="e-ad-card m-3">
              <img src={shoppingbag} height="50%" alt="" />
              <p className="text-medium text-white">Setup a store</p>
            </div>
            <div className="e-ad-card m-3">
              <img src={DollarSign} height="50%" alt="" />
              <p className="text-medium text-white">Recieve Payment</p>
            </div>
            <div className="e-ad-card m-3">
              <img src={ShoppingCart} height="50%" alt="" />
              <p className="text-medium text-white">
                Buy from verified sellers
              </p>
            </div>
            <div className="e-ad-card m-3">
              <img src={CreditCard} height="50%" alt="" />
              <p className="text-medium text-white">
                Get a refund on verified products
              </p>
            </div>
          </div>
        </div>{" "}
      </section>

      <section id="hompageSectionTwo" className="bg-white">
        <div className="container py-5 my-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <h1 className="display-medium-bold">
                Get your audience to your important links
              </h1>
              <ul>
                <li className="marked-list-item text-medium">
                  Add links to your contents
                </li>
                <li className="marked-list-item text-medium">
                  Add links to your social media pages
                </li>
                <li className="marked-list-item text-medium">
                  All on a single page
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-12">
              <img
                src={Group1000001664}
                alt="monaly products"
                width="100%"
                height="400px"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="hompageSectionTwo" className="bg-white">
        <div className="container py-5 my-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-12 ">
              <img
                src={Group1000001669}
                alt="monaly products"
                width="100%"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-12">
              <h1 className="display-medium-bold">
                Manage analytics of your social media
              </h1>
              <ul>
                <li className="marked-list-item text-medium">
                  measure how audience view and click your contents.
                </li>
                <li className="marked-list-item text-medium">
                  See countries where people are viewing and clicking your
                  contents.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-light py-5 ">
        <div className="conatiner ">
          <h1 className="display-medium-bold text-center">
            Try monaly PRO features 7 days free.
          </h1>
          <p className="text-large text-center">
            Reach more with your monaly links.
          </p>
          <div className="d-flex justify-content-center align-items center my-2 flex-wrap">
            <div className="pricing-card  p-3 m-3">
              <h1 className="display-small">FREE</h1>
              <h1 className="display-small">
                $0<span className="text-small">/month</span>
              </h1>
              <Link to="/sign-up" className="w-100 primary-inverse-btn my-4">
                Start Using For Free
              </Link>
              <ul>
                <li className="marked-list-item link-small">
                  <u>1 Instagram Business Account</u>
                </li>
                <li className="marked-list-item link-small">Auto Update</li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Unlimited Story Widgets</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Unlimited Galleries</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Multiple Layouts & Options</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Convert to AMP Format</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>API Access</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Team Sub-Accounts</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Advance Analytics</strike>
                </li>
              </ul>
            </div>

            <div className="pricing-card monaly-border p-3 m-3">
              <h1 className="display-small">PRO</h1>
              <h1 className="display-small-bold">
                $5<span className="text-small">/month</span>
              </h1>
              <Link to="sign-up" className="w-100 primary-btn my-4">
                Join the PROs
              </Link>
              <ul>
                <li className="marked-list-item link-small">
                  <u>1 Instagram Business Account</u>
                </li>
                <li className="marked-list-item link-small">Auto Update</li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Unlimited Story Widgets</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Unlimited Galleries</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Multiple Layouts & Options</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Convert to AMP Format</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>API Access</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Team Sub-Accounts</strike>
                </li>
                <li className="marked-list-item text-muted link-small">
                  <strike>Advance Analytics</strike>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="homepageSectionFive" className="py-5 my-5 ">
        <div className="container-fluid">
          <h1 className="display-large-bold text-center ">
            What people are saying about us
          </h1>
          <div className=" my-5">
            <div className="d-flex testimony-box py-3 justify-content-start">
              <TestimonyCard
                image={picp}
                heading="Terry Dias"
                text="I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders..."
                className="rad-top-left-0 rad-bottom-right-0"
              />
              <TestimonyCard
                image={picp}
                heading="Terry Dias"
                text="I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders..."
              />
              <TestimonyCard
                image={picp}
                heading="Terry Dias"
                text="I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders..."
              />
              <TestimonyCard
                image={picp}
                heading="Terry Dias"
                text="I just signed up for a trial and within a couple of hours had a brand
        new customer testimonials page built on our website as well as
        sliders..."
                className="rad-top-right-0 rad-bottom-left-0"
              />
            </div>
          </div>
        </div>{" "}
      </section>

      <footer className="text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 my-3">
              <Link to="/">
                <img src={MonalyLogoWhite} height="40px" alt="" />
              </Link>
              <div className="text-small text-white mt-3">
                monaly inc brings you to the world by using links to advertise
                your products and business.
              </div>
            </div>

            <div className="col-md-2 col-12 my-3">
              <div className="link-small text-white">Product</div>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Reviews management
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Embed Instagram stories
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Display Instagram feeds
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Collect reviews
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Send email requests
                </Link>
              </p>
            </div>

            <div className="col-md-2 col-12 my-3">
              <div className="link-small text-white">Company</div>

              <p>
                <Link to="/" className="text-x-small text-white">
                  About EmbedSocial
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Brand Guidelines
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Press Kit
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Support
                </Link>
              </p>
            </div>

            <div className="col-md-2 col-12 my-3">
              <div className="link-small text-white">Integrations</div>

              <p>
                <Link to="/" className="text-x-small text-white">
                  WordPress
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Shopify
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Magento
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Squarespace
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Intercom
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Slack
                </Link>
              </p>
            </div>

            <div className="col-md-2 col-12 my-3">
              <div className="link-small text-white">Integrations</div>

              <p>
                <Link to="/" className="text-x-small text-white">
                  WordPress
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Shopify
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Magento
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Squarespace
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
                  Intercom
                </Link>
              </p>
              <p>
                <Link to="/" className="text-x-small text-white">
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
        className="avatar mb-3"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <p className="link-x-small monaly-primary">{heading}</p>
      <p className="text-x-small ">{text}</p>
    </div>
  );
};
export default HomePage;
