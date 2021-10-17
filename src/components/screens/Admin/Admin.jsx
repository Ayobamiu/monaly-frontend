import {
  faAngleDown,
  faCaretDown,
  faHeart,
  faLink,
  faStore,
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
  return (
    <div id="admin">
      <nav>
        <span className="custom-p">
          <img src={monalydashboardlogo} alt="" /> Analytics
        </span>
        {/* <div className="admin-search-input">
          <CustomInput
            placeholder="Search for username/email"
            icon={faHeart}
            id="search-admin"
            onChange={(text) => {
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
     */}
      </nav>
      {/* <section className="bg-light " id=""> */}
      {/* <div className="venn-container">
          <div className="venncirctop">{nFormatter(users.length, 1)}</div>
          <div className="venncirclft">{nFormatter(users.length, 1)}</div>
          <div className="venncircrt">{nFormatter(0, 1)}</div>
        </div>
        <div className="venn-interpretation">
          <span className="venn-one custom-p bold">Registered Users</span>
          <span className="venn-two custom-p bold">Free Tier Accounts</span>
          <span className="venn-three custom-p bold">Premium Accounts</span>
        </div> */}
      {/* <div className="d-flex ">
          <div className="count-item bg-secondary">
            <span>Registered Users</span>
            <div>{nFormatter(users.length, 1)}</div>
          </div>
          <div className="count-item bg-secondary">
            <span>Free Tier Accounts</span>
            <div>{nFormatter(users.length, 1)}</div>
          </div>
          <div className="count-item bg-secondary">
            <span>Premium Accounts</span>
            <div>{nFormatter(0, 1)}</div>
          </div>
        </div> */}
      {/* </section> */}
      <section className="product-statistics p-2" id="product-statistics">
        <h3 className="text-center">Users </h3>

        <div className="statistic-items">
          <div className="statistic-item statistic-item-one">
            <h3>{nFormatter(users.length, 1)}</h3>
            <small>Registered Users</small>
          </div>
          <div className="statistic-item statistic-item-two">
            <h3>{nFormatter(users.length, 1)}</h3>
            <small>Free Tier Accounts</small>
          </div>
          {/* <div className="statistic-item statistic-item-three">
            <h3>{statistics.customLinksCount}</h3>
            <small>Urls Hosted</small>
          </div>
          <div className="statistic-item statistic-item-four">
            <h3>{statistics.noOfClicks}</h3>
            <small>Total URL Clicks</small>
          </div> */}
        </div>
      </section>
      <section className="product-statistics p-2" id="product-statistics">
        <h3 className="text-center">Product Statistics</h3>

        <div className="statistic-items">
          <div className="statistic-item statistic-item-one">
            <h3>{statistics.customLinksCount}</h3>
            <small>Monalys Created</small>
          </div>
          <div className="statistic-item statistic-item-two">
            <h3>{statistics.noOfVisits}</h3>
            <small>Total Monaly Visits</small>
          </div>
          <div className="statistic-item statistic-item-three">
            <h3>{statistics.customLinksCount}</h3>
            <small>Urls Hosted</small>
          </div>
          <div className="statistic-item statistic-item-four">
            <h3>{statistics.noOfClicks}</h3>
            <small>Total URL Clicks</small>
          </div>
        </div>
      </section>

      <div className="container">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <small>Username</small>
                </th>
                <th scope="col">
                  <small>Email</small>
                </th>
                <th scope="col">
                  <small>links</small>
                </th>
                <th scope="col">
                  <small>stores</small>
                </th>
                <th scope="col">
                  <small>products</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>
                    <small>@{user.userName}</small>
                  </td>
                  <td>
                    <small>{user.email}</small>
                  </td>
                  <td>
                    <small>{user.linksCount}</small>
                  </td>
                  <td>
                    <small>{user.storesCount}</small>
                  </td>
                  <td>
                    <small>
                      {user.productsCount}
                      {/* product */}
                      {/* {user.productsCount > 1 && "s"} */}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <section className="users-list" id="users-list">
        {users.map((user) => (
          <div className="users-list-item">
            <span className="username">@{user.userName}</span>
            <span className="email">{user.email}</span>
            <span className="">
              <FontAwesomeIcon
                icon={faLink}
                size="sm"
                className="text-secondary"
              />{" "}
              {user.linksCount}
            </span>
            <span className="">
              <FontAwesomeIcon
                icon={faStore}
                size="sm"
                className="text-secondary"
              />{" "}
              {user.storesCount}
            </span>
            <span className="">
              {user.productsCount} product{user.productsCount > 1 && "s"}
            </span>
          </div>
        ))}
      </section>
   */}
    </div>
  );
};

export default Admin;
