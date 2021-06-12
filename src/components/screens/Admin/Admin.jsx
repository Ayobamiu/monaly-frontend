import {
  faAngleDown,
  faCaretDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import monalydashboardlogo from "../../../assets/images/Vector.svg";
import CustomInput from "../../includes/CustomInput/CustomInput";
import picp from "../../../assets/images/picp.jpg";
import "./css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledPopover } from "reactstrap";
import { getInitialsOnProfile, nFormatter } from "../../../assets/js/controls";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../../store/userSlice";
import { getLoggedInUser, loadLoggedInUser } from "../../../store/authSlice";
import { getStatistics } from "../../../store/customLinkSlice";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadLoggedInUser());
    dispatch(getStatistics());
    document.title = "Admin | Monaly";
  }, []);
  const users = useSelector((state) => state.app.users.list);
  const statistics = useSelector((state) => state.app.customLinks.statistics);
  const loggedInUser = useSelector((state) => state.app.user.profile);
  const profile = getLoggedInUser();
  console.log("statistics", statistics);
  return (
    <div id="admin">
      <nav>
        <span className="custom-p">
          <img src={monalydashboardlogo} alt="" /> Analytics
        </span>
        <div className="admin-search-input">
          <CustomInput
            placeholder="Search for username/email"
            icon={faHeart}
            id="search-admin"
            onChange={(text) => {
              console.log(text);
            }}
          />
        </div>
        <span className="custom-p">Welcome, {loggedInUser.firstName}</span>
        <div className="admin-avatar-wrap" id="admin-avatar-wrap">
          <div
            className="admin-avatar"
            style={{ backgroundImage: `url(${loggedInUser.profilePhoto})` }}
          >
            {!loggedInUser.profilePhoto && getInitialsOnProfile(loggedInUser)}
          </div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom-end"
          target="admin-avatar-wrap"
        >
          <div className="popup">
            <button>Copy your monaly URL</button>
            <button>Log Out</button>
          </div>
        </UncontrolledPopover>
      </nav>
      <section className="analytics-summary" id="analytics-summary">
        <div className="venn-container">
          <div className="venncirctop">{nFormatter(users.length, 1)}</div>
          <div className="venncirclft">{nFormatter(users.length, 1)}</div>
          <div className="venncircrt">{nFormatter(0, 1)}</div>
        </div>
        <div className="venn-interpretation">
          <span className="venn-one custom-p bold">Registered Users</span>
          <span className="venn-two custom-p bold">Free Tier Accounts</span>
          <span className="venn-three custom-p bold">Premium Accounts</span>
        </div>
      </section>
      <section className="product-statistics" id="product-statistics">
        <h1>Product Statistics</h1>
        <div className="statistic-items">
          <div className="statistic-item statistic-item-one">
            <h3>{statistics.customLinksCount}</h3>
            <span>Monalys Created</span>
          </div>
          <div className="statistic-item statistic-item-two">
            <h3>{statistics.noOfVisits}</h3>
            <span>Total Monaly Visits</span>
          </div>
          <div className="statistic-item statistic-item-three">
            <h3>{statistics.customLinksCount}</h3>
            <span>Urls Hosted</span>
          </div>
          <div className="statistic-item statistic-item-four">
            <h3>{statistics.noOfClicks}</h3>
            <span>Total URL Clicks</span>
          </div>
        </div>
      </section>
      <section className="users-list" id="users-list">
        {users.map((user) => (
          <div className="users-list-item">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${user.profilePhoto})` }}
            >
              {!user.profilePhoto && getInitialsOnProfile(user)}
            </div>
            <span className="username">@{user.userName}</span>
            <span className="email">{user.email}</span>
            <span className="account-type">Free Tier Account</span>
            <button>Learn More</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
