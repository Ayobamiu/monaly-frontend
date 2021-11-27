import "./css/styles.css";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faStore,
  faTimesCircle,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyTransactions, loadLoggedInUser } from "../../../store/authSlice";
import moment from "moment";

export default function Money(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.app.user.profile);
  const transactions = useSelector((state) => state.app.user.transactions);
  const loading = useSelector((state) => state.app.user.loading);

  useEffect(() => {
    dispatch(loadLoggedInUser());
    dispatch(getMyTransactions());
  }, [dispatch]);
  return (
    <div className="bg-light">
      <main className="container w-100 py-3">
        <div className="row justify-content-between">
          <div className="col-12 col-md-3 px-4">
            <div className="small-box bg-white my-4 d-flex p-3 justify-content-center flex-column align-items-center">
              <div
                className="avatar bg-secondary link-large text-white"
                style={{ backgroundImage: `url(${profile.profilePhoto})` }}
              >
                {!profile.profilePhoto &&
                  profile.firstName &&
                  profile.firstName.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-x-small my-2">
                Hello, {profile.firstName}
              </div>
            </div>
            <div className="small-box bg-white my-4 d-flex p-3 justify-content-center flex-column align-items-center">
              <FontAwesomeIcon
                icon={faWallet}
                className="text-secondary"
                size="2x"
              />
              <div className="link-large">
                &#8358;{profile.availableBalance}
              </div>
              <div className="text-x-small text-secondary ">
                Available Balance
              </div>
              <div className="border-bottom w-100 mt-3"></div>
              <div className="d-flex w-100 justify-content-between mt-3">
                <span className="text-success text-x-small">
                  <NavLink to="/withdraw">Withdraw</NavLink>
                </span>
                {/* <span className="text-success text-x-small">Deposit</span> */}
              </div>
            </div>
            <div className="small-box bg-white my-4 d-flex p-3 justify-content-center flex-column align-items-center">
              <FontAwesomeIcon
                icon={faStore}
                className="text-secondary"
                size="2x"
              />

              <div className="text-x-small text-secondary mt-2">
                Your Stores
              </div>
              <div className="border-bottom w-100 mt-3"></div>
              <div className="d-flex w-100 justify-content-between mt-3">
                <span className="text-success text-x-small">
                  <NavLink to="/stores">View Stores</NavLink>
                </span>
                <span className="text-success text-x-small">
                  <NavLink to="/add-product">Add Product</NavLink>
                </span>
                {/* <span className="text-success text-x-small">Deposit</span> */}
              </div>
            </div>
            {/* <div className="small-box bg-white my-4"></div> */}
          </div>
          <div className="col-12 col-md-9 ">
            {loading && (
              <div class="loader-line">
                <div class="loader__element"></div>
              </div>
            )}
            <div className="w-100 p-3 bg-white my-4 link-medium">
              Recent Activities
            </div>

            <div className="table-responsive">
              <table className="w-100 table">
                <thead className="bg-transparent">
                  <tr>
                    <th className="text-x-small">Date</th>
                    <th className="text-start text-x-small">Description</th>
                    <th className="text-center text-x-small">Status</th>
                    <th className="text-end text-x-small">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {transactions.map((transaction) => (
                    <tr>
                      <td className="">
                        <div className="display-large">
                          {moment(transaction.createdAt).format("Do")}
                        </div>
                        <div className="text-x-small">
                          {moment(transaction.createdAt).format("MMM")}
                        </div>
                      </td>
                      <td className="text-start ">
                        <div className="link-x-small">
                          {transaction.destination}
                        </div>
                        <div className="text-x-small">
                          {transaction.description}
                        </div>
                      </td>
                      <td className="text-center ">
                        {transaction.status === "completed" && (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-success"
                          />
                        )}
                        {transaction.status === "failed" && (
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="text-danger"
                          />
                        )}
                        {transaction.status === "pending" && (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-warning"
                          />
                        )}
                      </td>
                      <td className="text-end link-x-small">
                        -$565 {transaction.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactions && transactions.length === 0 && (
                <div className="p-4 text-center link-medium w-100 border rounded">
                  You will see history of your transactions here
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
