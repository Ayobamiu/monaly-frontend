/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyVisitors } from "../../../store/authSlice";
import "./css/style.css";
import Workbook from "react-excel-workbook";
// import DataMap from "../../includes/Map/Map";
// import ApexChart from "../../includes/ApexChart/ApexChart";
import { clickThroughRatio, nFormatter } from "../../../assets/js/controls";
import { Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPen } from "@fortawesome/free-solid-svg-icons";
import { getAnalytics } from "../../../store/customLinkSlice";
import { capitalize } from "lodash";
import moment from "moment";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
// const { Option } = Select;

const Analytics = () => {
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.app.user.visitors);
  const userProfile = useSelector((state) => state.app.user.profile);
  const subscription = useSelector((state) => state.app.user.subscription);

  const isSubscribed = subscription && subscription.status === "active";

  // const [startPoint, setStartPoint] = useState(0);
  // const [endPoint, setEndPoint] = useState(10);
  // const [targetVisitor, setTargetVisitor] = useState({});
  const [selectedLink, setSelectedLink] = useState();
  const [analyticsCategory, setAnalyticsCategory] = useState("city");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    dispatch(getMyVisitors());
  }, [dispatch]);
  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        getAnalytics({
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        })
      );
    } else {
      dispatch(getAnalytics());
    }
  }, [dispatch, startDate, endDate]);
  // const slicedVisitors = visitors.slice(startPoint, endPoint);
  // const countries = useSelector((state) => state.app.user.countries);
  const analytics = useSelector((state) => state.app.customLinks.analytics);
  const loadingAnalytics = useSelector(
    (state) => state.app.customLinks.loadingAnalytics
  );

  const visitorsData = visitors.map((visitor, index) => {
    return {
      index: index + 1,
      city: visitor.city,
      country: visitor.country,
      location: visitor.visitorLocation,
    };
  });
  // const Navigation = () => {
  //   return (
  //     <nav aria-label='Page navigation example'>
  //       <ul class='pagination justify-content-end'>
  //         <li
  //           class={`page-item ${startPoint - 10 < 0 && "disabled"}`}
  //           onClick={() => {
  //             if (startPoint - 10 < 0) {
  //               return;
  //             }
  //             setStartPoint(startPoint - 10);
  //             setEndPoint(endPoint - 10);
  //           }}>
  //           <a class='page-link' href='#TT' tabindex='-1' aria-disabled='true'>
  //             Previous
  //           </a>
  //         </li>
  //         <li class='page-item'>
  //           <a class='page-link' href='#TT'>
  //             {startPoint + 1}
  //           </a>
  //         </li>
  //         <li class='page-item'>
  //           <a class='page-link' href='#TT'>
  //             to
  //           </a>
  //         </li>
  //         <li class='page-item'>
  //           <a class='page-link' href='#TT'>
  //             {endPoint < visitors.length ? endPoint : visitors.length}
  //           </a>
  //         </li>
  //         <li
  //           class={`page-item ${
  //             visitors.length <= startPoint + 10 && "disabled"
  //           }`}
  //           onClick={() => {
  //             if (visitors.length <= startPoint + 10) {
  //               return;
  //             }
  //             setStartPoint(startPoint + 10);
  //             setEndPoint(endPoint + 10);
  //           }}>
  //           <a class='page-link' href='#TT'>
  //             Next
  //           </a>
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  // };

  const LinkDetails = ({ selected = false, item }) => {
    return (
      <div
        onClick={() => {
          if (selectedLink === item?._id) {
            setSelectedLink();
          } else {
            setSelectedLink(item?._id);
          }
        }}
        className={` ${
          selected ? "bg-white" : "border"
        }  row p-3 align-items-center mb-3 w-100 cursor`}>
        <div className='col-md-8 col-12'>
          <div className='d-flex align-items-center'>
            <span className='text-small text-truncate mr-2' title={item.title}>
              {item.title?.slice(0, 25)}
              {item.title?.length > 25 ? ".." : ""}
            </span>
            <FontAwesomeIcon icon={faPen} className='text-muted' size='sm' />
          </div>
          <div className='d-flex align-items-center'>
            <span className='text-small text-truncate mr-2' title={item.link}>
              {item.link?.slice(0, 25)}
              {item.link?.length > 25 ? ".." : ""}
            </span>
            <FontAwesomeIcon icon={faPen} className='text-muted' size='sm' />
          </div>
        </div>
        <div className='link-small ms-auto col-md-4 col-12 text-md-end'>
          {item.clickCount} Click{item.clickCount > 1 ? "s" : ""}
        </div>
      </div>
    );
  };

  const ProgressItem = ({ name, percent }) => {
    return (
      <div className='d-flex flex-wrap justify-content-between pr-md-3 align-items-baseline my-md-3 my-2'>
        <div className='col-md-3 col-12 p-0'>
          <span className='link-small mr-3 '>{name}</span>
        </div>
        <div className='col-md-9 col-12 p-0'>
          <Progress
            size='default'
            strokeColor='#EF476F'
            trailColor='rgba(239, 71, 111, 0.18)'
            percent={percent}
            width={5}
          />
        </div>
      </div>
    );
  };

  const cityOrCountry =
    analyticsCategory === "city" ? analytics.cities : analytics.countries;
  return (
    <section class='analytics '>
      {/* <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                More Information
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div class='modal-body'>
              <p>Country: {targetVisitor && targetVisitor.country}</p>
              <p>City: {targetVisitor && targetVisitor.city}</p>
              <p>Location: {targetVisitor && targetVisitor.visitorLocation}</p>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-primary'
                data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className='row m-0 mb-5 g-2'>
        <div className='analytics-metrics-item'>
          <p className='link-small text-center'>Total Clicks</p>
          <h2>
            {userProfile.clickCount ? nFormatter(userProfile.clickCount, 1) : 0}
          </h2>
          <small className='text-x-small text-center text-muted'>
            The following interacted with your links.
          </small>
        </div>
        <div className='analytics-metrics-item '>
          <p className='link-small text-center'>CTR</p>
          <h2>{clickThroughRatio(userProfile)}%</h2>
          <small className='text-x-small text-center text-muted'>
            Your Click Through Rate is normal.
          </small>
        </div>
        <div className='analytics-metrics-item '>
          <p className='link-small text-center'>Total Visits</p>
          <h2>
            {userProfile.viewCount ? nFormatter(userProfile.viewCount, 1) : 0}
          </h2>
          <small className='text-x-small text-center text-muted'>
            The following visited your profile.
          </small>
        </div>
      </div>
      <div className='bg-light br-16  p-3 remove-margin position-relative overflow-hidden '>
        {!isSubscribed && (
          <div className='appearance-box-inactive'>
            <FontAwesomeIcon icon={faLock} size='lg' />
            <p className='text-medium mt-2'>
              Subscribe to view detailed analytics
            </p>
            <div>
              <SubscribeButton title='Subscribe Now' />
            </div>
          </div>
        )}
        <div className={` ${!isSubscribed && "blur"}`}>
          <span className='text-small'>Download Visitors Data </span>
          {isSubscribed ? (
            <Workbook
              filename='visitors.xlsx'
              element={<button className='btn btn-success'>Download</button>}>
              <Workbook.Sheet data={visitorsData} name='Sheet A'>
                <Workbook.Column label='#' value='index' />
                <Workbook.Column label='City' value='city' />
                <Workbook.Column label='Country' value='country' />
                <Workbook.Column label='Location' value='location' />
              </Workbook.Sheet>
            </Workbook>
          ) : (
            <button className='btn btn-success disabled' disabled>
              Download
            </button>
          )}
        </div>
        <div className={`row ${!isSubscribed && "blur"}`}>
          <div className='col-12 col-lg-5 my-2 '>
            <div className='analytics-metrics-overflow pr-md-4'>
              <p className='text-large'>
                All Links{" "}
                {loadingAnalytics && (
                  <div className='loader d-inline-block'></div>
                )}
              </p>
              <div>
                {analytics.customLinks.map((item) => (
                  <LinkDetails
                    selected={item._id === selectedLink}
                    item={item}
                  />
                ))}

                {analytics.customLinks.length === 0 && (
                  <div className='no-visitors-details'>
                    <h2>Nothing here yet</h2>
                    <p className='custom-p'>
                      You will see list of your links here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-7 my-2 '>
            <div className='analytics-metrics-overflow'>
              <div className='d-flex justify-content-between pr-3 align-items-baseline'>
                <p className='text-large'>
                  Detailed Analytics{" "}
                  {loadingAnalytics && (
                    <div className='loader d-inline-block'></div>
                  )}
                </p>
                <select
                  name=''
                  id=''
                  className='small-select text-x-small'
                  onChange={(e) => {
                    if (e.target.value === "1") {
                      setStartDate();
                      setEndDate();
                    }
                    if (e.target.value === "2") {
                      setStartDate(moment().startOf("week").toISOString());
                      setEndDate(moment().endOf("week").toISOString());
                    }
                    if (e.target.value === "3") {
                      setStartDate(moment().subtract(2, "w").toDate());
                      setEndDate(moment().subtract(1, "w").toDate());
                    }
                    if (e.target.value === "4") {
                      setStartDate(moment().startOf("month").toISOString());
                      setEndDate(moment().endOf("month").toISOString());
                    }
                    if (e.target.value === "5") {
                      setStartDate(moment().subtract(2, "M").toDate());
                      setEndDate(moment().subtract(1, "M").toDate());
                    }
                  }}>
                  <option value='1'>All</option>
                  <option value='2'>This Week</option>
                  {/* <option value='3'>Last Week</option> */}
                  <option value='4'>This Month</option>
                  {/* <option value='5'>Last Month</option> */}
                </select>
              </div>
              <div className='d-flex justify-content-between pr-3 align-items-baseline'>
                <p className='link-small'>Location</p>
                <div className='d-flex'>
                  <div
                    onClick={() => setAnalyticsCategory("country")}
                    className={`country-city-button ${
                      analyticsCategory === "country" && "selected"
                    }`}>
                    Country
                  </div>
                  <div
                    onClick={() => setAnalyticsCategory("city")}
                    className={`country-city-button ${
                      analyticsCategory === "city" && "selected"
                    } ml-2`}>
                    City
                  </div>
                </div>
              </div>

              {cityOrCountry.map((item) => (
                <ProgressItem
                  name={item._id ? item._id : "Others"}
                  percent={Math.round(
                    (item.count * 100) /
                      cityOrCountry.reduce((a, b) => +a + +b.count, 0)
                  )}
                />
              ))}
              {cityOrCountry.length === 0 && (
                <div className='no-visitors-details'>
                  <h2>Nothing here yet</h2>
                  <p className='custom-p'>
                    You will see analytics of{" "}
                    {analyticsCategory === "city" ? "cities" : "countries"}{" "}
                    where your links got impressions here
                  </p>
                </div>
              )}

              <p className='link-small mt-5 mb-4'>Device</p>
              {analytics.deviceType.map((item) => (
                <ProgressItem
                  name={item._id ? capitalize(item._id) : "Others"}
                  percent={Math.round(
                    (item.count * 100) /
                      analytics.deviceType.reduce((a, b) => +a + +b.count, 0)
                  )}
                />
              ))}
              {analytics.deviceType.length === 0 && (
                <div className='no-visitors-details'>
                  <h2>Nothing here yet</h2>
                  <p className='custom-p'>
                    You will see analytics of devices that viewed your links
                    here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className=''>
        <ul class='nav nav-pills mb-3 py-2' id='pills-tab' role='tablist'>
          <li class='' role='presentation'>
            <button
              class='nav-link active'
              id='pills-map-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-map'
              type='button'
              role='tab'
              aria-controls='pills-map'
              aria-selected='true'>
              All
            </button>
          </li>
          <li class='' role='presentation'>
            <button
              class='nav-link'
              id='pills-bars-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-bars'
              type='button'
              role='tab'
              aria-controls='pills-bars'
              aria-selected='false'>
              Top Countries
            </button>
          </li>
        </ul>

        <div class='tab-content' id='pills-tabContent'>
          <div
            class='tab-pane fade show active'
            id='pills-map'
            role='tabpanel'
            aria-labelledby='pills-map-tab'>
            <DataMap />
          </div>
          <div
            class='tab-pane fade'
            id='pills-bars'
            role='tabpanel'
            aria-labelledby='pills-bars-tab'>
            <ApexChart countries={countries} />
          </div>
        </div>
      </div> */}

      {/* <div className='row justify-content-between'>
        <div className='col'>
          <h2 className='py-2'>Visitors</h2>
        </div>
        <div className='col'>
          <h2 className='py-2 text-end'>
            {isSubscribed ? (
              <Workbook
                filename='visitors.xlsx'
                element={<button className='btn btn-success'>Download</button>}>
                <Workbook.Sheet data={visitorsData} name='Sheet A'>
                  <Workbook.Column label='#' value='index' />
                  <Workbook.Column label='City' value='city' />
                  <Workbook.Column label='Country' value='country' />
                  <Workbook.Column label='Location' value='location' />
                </Workbook.Sheet>
              </Workbook>
            ) : (
              <button className='btn btn-success disabled' disabled>
                Download
              </button>
            )}
          </h2>
        </div>
      </div> */}
      {/* <Navigation />

      <table class='table analytics-table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Country</th>
            <th scope='col'>City</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {slicedVisitors.map((visitor, index) => (
            <tr key={index}>
              <td>{visitor.country}</td>
              <td>{visitor.city}</td>
              <td>
                <button
                  className='primary-btn-inverse custom-btn-sm'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                  onClick={() => {
                    setTargetVisitor(visitor);
                  }}>
                  more
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visitors.length === 0 && (
        <div className='no-visitors-details'>
          <h2>Nothing here yet</h2>
          <p className='custom-p'>You will see all your visitors data here</p>
        </div>
      )}
      <Navigation /> */}
      <div style={{ height: "300px" }}></div>
    </section>
  );
};

export default Analytics;
