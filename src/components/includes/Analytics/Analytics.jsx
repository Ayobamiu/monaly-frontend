/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyVisitors } from "../../../store/authSlice";
import "./css/style.css";
import Workbook from "react-excel-workbook";
import DataMap from "../../includes/Map/Map";
import ApexChart from "../../includes/ApexChart/ApexChart";
import { clickThroughRatio } from "../../../assets/js/controls";

const Analytics = () => {
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.app.user.visitors);
  const userProfile = useSelector((state) => state.app.user.profile);
  const subscription = useSelector((state) => state.app.user.subscription);

  const isSubscribed = subscription && subscription.status === "active";

  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(10);
  const [targetVisitor, setTargetVisitor] = useState({});
  useEffect(() => {
    dispatch(getMyVisitors());
  }, [dispatch]);
  const slicedVisitors = visitors.slice(startPoint, endPoint);
  const countries = useSelector((state) => state.app.user.countries);

  const visitorsData = visitors.map((visitor, index) => {
    return {
      index: index + 1,
      city: visitor.city,
      country: visitor.country,
      location: visitor.visitorLocation,
    };
  });
  const Navigation = () => {
    return (
      <nav aria-label='Page navigation example'>
        <ul class='pagination justify-content-end'>
          <li
            class={`page-item ${startPoint - 10 < 0 && "disabled"}`}
            onClick={() => {
              if (startPoint - 10 < 0) {
                return;
              }
              setStartPoint(startPoint - 10);
              setEndPoint(endPoint - 10);
            }}>
            <a class='page-link' href='#TT' tabindex='-1' aria-disabled='true'>
              Previous
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#TT'>
              {startPoint + 1}
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#TT'>
              to
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#TT'>
              {endPoint < visitors.length ? endPoint : visitors.length}
            </a>
          </li>
          <li
            class={`page-item ${
              visitors.length <= startPoint + 10 && "disabled"
            }`}
            onClick={() => {
              if (visitors.length <= startPoint + 10) {
                return;
              }
              setStartPoint(startPoint + 10);
              setEndPoint(endPoint + 10);
            }}>
            <a class='page-link' href='#TT'>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };
  return (
    <section class='analytics '>
      <div
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
      </div>

      <div className='analytics-metrics'>
        <div className='analytics-metrics-item'>
          <p className='custom-p text-center'>Total Visits</p>
          <h2>{userProfile.viewCount || 0}</h2>
        </div>
        <div className='analytics-metrics-item'>
          <p className='custom-p text-center'>Total Clicks</p>
          <h2>{userProfile.clickCount || 0}</h2>
        </div>
        <div className='analytics-metrics-item'>
          <p className='custom-p text-center'>Click Through Ratio</p>
          <h2>{clickThroughRatio(userProfile)}%</h2>
        </div>
      </div>

      <div className=''>
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
      </div>

      <div className='row justify-content-between'>
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
      </div>
      <Navigation />

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
      <Navigation />
      <div style={{ height: "300px" }}></div>
    </section>
  );
};

export default Analytics;
