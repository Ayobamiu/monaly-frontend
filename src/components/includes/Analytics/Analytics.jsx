/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyVisitors } from "../../../store/authSlice";
import "./css/style.css";

const Analytics = () => {
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.app.user.visitors);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(10);
  const [targetVisitor, setTargetVisitor] = useState({});
  useEffect(() => {
    dispatch(getMyVisitors());
  }, [dispatch]);
  const slicedVisitors = visitors.slice(startPoint, endPoint);
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
      <div style={{ height: "100px" }}></div>
    </section>
  );
};

export default Analytics;
