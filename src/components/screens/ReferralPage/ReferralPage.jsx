/** @format */

import React, { useEffect, useState } from "react";
import "./style.css";
import { message, Modal, Steps } from "antd";
import monaly_logo from "../../../assets/images/monaly_logo.png";
import CustomInput from "../../includes/CustomInput/CustomInput";
import AppButton from "../../includes/AppButton/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faClone,
  faEnvelope,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAuthInput,
  checkUserNameAvailability,
  getUserNameSuggestions,
  signUserUpFromReferral,
  userNameloading,
} from "../../../store/authSlice";
import generateUsernames from "../../../assets/js/generateUsernames";
// import jobTitles from "../../../assets/jsons/jobTitles.json";

const { Step } = Steps;

export default function ReferralPage(props) {
  const signingUp = useSelector((state) => state.app.user.signingUp);
  // const [signingUp, setSigningUp] = useState(false);
  const loadingSuggestions = useSelector((state) => state.app.user.loading);
  const suggestions = useSelector((state) => state.app.user.suggestions);

  const statusUsername = useSelector((state) => state.app.user.userName.status);
  const loadingUserName = useSelector(userNameloading);

  let params = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleInvite, setIsModalVisibleInvite] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState("");

  const [occupation, setOccupation] = useState("");

  const signUpError = useSelector((state) => state.app.user.signUpError);
  const signUpStatus = useSelector((state) => state.app.user.signUpStatus);

  // const signUpUserName = useSelector((state) => state.app.user.signUpUserName);

  const handleSignUp = () => {
    const data = {
      firstName,
      lastName,
      email,
      userName,
      password,
      occupation,
      bio: occupation,
    };
    if (params.refId) {
      data.refId = params.refId;
    }
    // setSigningUp(true);
    // setTimeout(() => {
    // setSigningUp(false);
    // setShowing(3);
    // }, 2000);
    dispatch(signUserUpFromReferral(data));
  };

  function updateUserName(ish) {
    document.getElementById("userNameInput").value = ish;
    dispatch(checkUserNameAvailability(ish));
  }
  function updateOccupation(ish) {
    document.getElementById("occupationInput").value = ish;
  }
  // const occupationSuggestions = ["Content Developer", ""];
  useEffect(() => {
    if (signUpStatus === "failed") {
      if (signUpError) {
        message.error(signUpError);
      } else {
        message.error("Error signing Up. Try Again!");
      }
    }
    if (signUpStatus === "success") {
      message.success("Welcome to Monaly!");
      setShowing(3);
    }
    dispatch(changeAuthInput("signUpStatus", "pending"));
  }, [dispatch, signUpStatus, signUpError]);

  return (
    <div id='referralPage'>
      <div id='side-bar' className='p-4'>
        <img src={monaly_logo} alt='' className='logo hide-900' />
        <div className='show-900 '>
          <Steps direction='horizontal' size='small' current={showing}>
            <Step
              title={<span className='text-x-small'>Name and email</span>}
            />
            <Step
              title={<span className='text-x-small'>Choose a username</span>}
            />
            <Step
              title={<span className='text-x-small'>What do you do?'</span>}
            />
            <Step title={<span className='text-x-small'>Profile</span>} />
          </Steps>
        </div>
        <div className='hide-900'>
          <Steps direction='vertical' size='small' current={showing}>
            <Step
              title={<span className='text-x-small'>Name and email</span>}
            />
            <Step
              title={<span className='text-x-small'>Choose a username</span>}
            />
            <Step
              title={<span className='text-x-small'>What do you do?'</span>}
            />
            <Step title={<span className='text-x-small'>Profile</span>} />
          </Steps>
        </div>
      </div>
      <main id='main-content' className='d-flex justify-content-center '>
        <div className='center-items p-2 mt-5 p-md-3 '>
          {showing === 0 && (
            <div className='referral-form-box'>
              <h1 className='header-p mb-5'>
                Welcome to Monaly, Lets get to know you!
              </h1>

              <form
                onSubmit={() => {
                  setShowing(1);
                  const suggestionsList = generateUsernames(
                    firstName,
                    lastName
                  );
                  dispatch(getUserNameSuggestions(suggestionsList));
                }}>
                <div className='my-4'>
                  <CustomInput
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder='First Name'
                    defaultValue={firstName}
                    type='text'
                    required={true}
                    id='firstName'
                  />
                </div>
                <div className='my-4'>
                  <CustomInput
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last Name'
                    type='text'
                    required={true}
                    id='lastName'
                  />
                </div>
                <div className='my-4'>
                  <CustomInput
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                    type='email'
                    required={true}
                    id='email'
                  />
                </div>
                <div className='my-4'>
                  <CustomInput
                    onChange={(e) => setPassword(e.target.value)}
                    secured={true}
                    placeholder='Password'
                    type='password'
                    required={true}
                    id='password'
                  />
                </div>
                <div className='w-100 d-flex justify-content-end my-4'>
                  <AppButton text='Next' large />
                </div>
              </form>
            </div>
          )}
          {showing === 1 && (
            <div className='referral-form-box'>
              <h1 className='header-p'>Choose a username</h1>
              <p className='text-medium mb-5 text-center'>
                Choose a unique username
              </p>

              <form
                // action='referral'
                onSubmit={() => setShowing(2)}>
                <div className='mt-4'>
                  <CustomInput
                    onChange={(e) => {
                      // dispatch(changeAuthInput("signUpUserName", e.target.value));
                      if (e.target.value && e.target.value.length > 0) {
                        dispatch(checkUserNameAvailability(e.target.value));
                      }
                      setUserName(e.target.value);
                    }}
                    placeholder='Username'
                    type='text'
                    required
                    name='userName'
                    id='userName'
                    defaultValue={userName}
                  />
                  {statusUsername && (
                    <div style={{ display: "flex", margin: 0 }}>
                      {loadingUserName && (
                        <div
                          class='spinner-border spinner-border-sm monaly-primary'
                          role='status'>
                          <span class='visually-hidden'>Loading...</span>
                        </div>
                      )}
                      {statusUsername && (
                        <span
                          style={{
                            color: statusUsername && statusUsername.color,
                          }}
                          className='notify-p'>
                          &nbsp; {statusUsername && statusUsername.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {loadingSuggestions && (
                  <div className='d-flex w-100 justify-content-center'>
                    <div className='text-small'>Loading suggestions</div>
                    <div className='loader'></div>
                  </div>
                )}
                {suggestions?.length > 0 && (
                  <p className='text-x-small text-center my-3'>
                    {/* Oops! that username is already take, try one of these */}
                    Or, try these suggestions.
                  </p>
                )}
                <div className='d-flex justify-content-center flex-wrap'>
                  {suggestions.slice(0, 6).map((i, index) => (
                    <AppButton
                      text={i}
                      inverse
                      small
                      className={`m-1 ${i === userName && "selectedUserName"}`}
                      type='button'
                      // onCLick={() => setUserName(i)}
                      onCLick={() => {
                        updateUserName(i);
                      }}
                    />
                  ))}
                </div>
                <div className='w-100 d-flex justify-content-between align-items-center my-5'>
                  <AppButton
                    text='Back'
                    secondary
                    type='button'
                    onCLick={() => {
                      setShowing(0);
                    }}
                  />
                  <AppButton
                    text='Next'
                    large
                    type='submit'
                    // onCLick={() => {
                    //   setShowing(2);
                    // }}
                  />
                </div>
              </form>
            </div>
          )}
          {showing === 2 && (
            <div className='referral-form-box'>
              <h1 className='header-p'>
                {firstName}, how would you describe Yourself?
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp();
                }}>
                <div className='mt-4'>
                  <CustomInput
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder='How Would You Describe Yourself?'
                    type='text'
                    required={true}
                    id='occupation'
                    defaultValue={occupation}
                  />
                </div>

                <p className='text-x-small text-center my-3'>Suggestions</p>
                <div className='d-flex justify-content-around flex-wrap'>
                  {[
                    "Entreprenuer",
                    "Model",
                    "Influencer",
                    "Writer",
                    "Technical Author",
                    "Music Promotions Manager",
                    "Musician",
                    "Composer or Songwriter",
                    "Video Editor",
                    "Character Artist",
                    "Skit Maker",
                    "YouTube Creator",
                    "TikTok Creator",
                  ].map((i) => (
                    <AppButton
                      text={i}
                      inverse
                      small
                      className={`m-1 ${
                        i === occupation && "selectedUserName"
                      }`}
                      title={i}
                      type='button'
                      onCLick={() => {
                        updateOccupation(i);
                      }}
                    />
                  ))}
                </div>
                <div className='w-100 d-flex justify-content-between align-items-center my-5'>
                  <AppButton
                    text='Back'
                    secondary
                    onCLick={() => {
                      setShowing(1);
                    }}
                  />
                  {signingUp ? (
                    <div className='loader'></div>
                  ) : (
                    <AppButton text='Next' large type='submit' />
                  )}
                </div>
              </form>
            </div>
          )}
          {showing === 3 && (
            <div>
              <div className='profile-box mx-auto'>
                <div className='avatar mb-4'>
                  <FontAwesomeIcon icon={faUser} size='3x' color='#eee' />
                </div>
                <h1 className='my-3'>
                  {firstName} {lastName}
                </h1>
                <p className='text-medium'>{occupation}</p>
              </div>
              <AppButton
                text='Go to dashboard'
                className=' mx-auto my-4'
                // onCLick={() => setIsModalVisible(true)}
              />
              <AppButton
                text='Invite friends to Monaly'
                className=' mx-auto my-4'
                secondary
                onCLick={() => setIsModalVisibleInvite(true)}
              />
            </div>
          )}
        </div>
      </main>

      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        onCancel={() => setIsModalVisible(false)}>
        <div className='iconWrapperContainer'>
          <div className='text-small text-center'>
            Let everyone know about your Monaly link. Share with friends.
          </div>

          <FacebookShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faFacebook} size='3x' />
              <span className='mx-3 link-medium'>Share on Facebook</span>
            </div>
          </FacebookShareButton>
          <TwitterShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faTwitter} size='3x' />
              <span className='mx-3 link-medium'>Share on twitter</span>
            </div>
          </TwitterShareButton>
          <WhatsappShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faWhatsapp} size='3x' />
              <span className='mx-3 link-medium'>Share on WhatsApp</span>
            </div>
          </WhatsappShareButton>
          <EmailShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faEnvelope} size='3x' />
              <span className='mx-3 link-medium'>Share via Email</span>
            </div>
          </EmailShareButton>
          {/* <div
            className='iconWrapper copyToClipBoard justify-content-between'
            onClick={() => {
              message.success("Copied to clipboard!");
            }}>
            <span className='mx-3 link-medium'>monaly.co/ayobamiu</span>
            <FontAwesomeIcon icon={faClone} size='2x' />
          </div> */}
          <div
            className='iconWrapper copyToClipBoard justify-content-between'
            onClick={() => {
              message.success("Copied to clipboard!");
            }}>
            <span className='mx-3 link-small'>
              https://monaly.co/referral?ref_id=jdv87228728826
            </span>
            <FontAwesomeIcon icon={faClone} size='2x' />
          </div>
        </div>
      </Modal>

      <Modal
        visible={isModalVisibleInvite}
        footer={null}
        closable={false}
        onCancel={() => setIsModalVisibleInvite(false)}>
        <div className='iconWrapperContainer'>
          {/* <div className='text-small text-center'>
            Invite three friends and get free
          </div> */}

          <FacebookShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faFacebook} size='3x' />
              <span className='mx-3 link-medium'>
                Invite frinends on Facebook
              </span>
            </div>
          </FacebookShareButton>
          <TwitterShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faTwitter} size='3x' />
              <span className='mx-3 link-medium'>
                Invite frinends on twitter
              </span>
            </div>
          </TwitterShareButton>
          <WhatsappShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faWhatsapp} size='3x' />
              <span className='mx-3 link-medium'>
                Invite frinends on WhatsApp
              </span>
            </div>
          </WhatsappShareButton>
          <EmailShareButton url='https://www.monaly.co' quote='Monaly'>
            <div className='iconWrapper'>
              <FontAwesomeIcon icon={faEnvelope} size='3x' />
              <span className='mx-3 link-medium'>Invite via Email</span>
            </div>
          </EmailShareButton>
          <div
            className='iconWrapper copyToClipBoard justify-content-between'
            onClick={() => {
              message.success("Copied to clipboard!");
            }}>
            <span className='mx-3 link-small'>
              https://monaly.co/referral?ref_id=jdv87228728826
            </span>
            <FontAwesomeIcon icon={faClone} size='2x' />
          </div>
        </div>
      </Modal>
    </div>
  );
}
