import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { freePackages, proPackages } from "../../../assets/js/controls";
import PayPal from "../PayPal/PayPal";
import "./css/style.css";

const Pricing = () => {
  return (
    <section class="pricing ">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Join the PROs
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <PayPal />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                &nbsp; Close &nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-2">
        {/* <!-- Pro Tier --> */}
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-muted text-uppercase text-center">
                Pro
              </h5>
              <h6 class="card-price text-center">
                $5<span class="period">/month</span>
              </h6>
              <hr />
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="btn btn-block btn-primary text-uppercase my-2"
              >
                Join the PROs
              </a>
              <ul class="fa-ul">
                {proPackages.map((item) => (
                  <li class={!item.available && "text-muted"}>
                    <span class="fa-li">
                      {item.available ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="btn btn-block btn-primary text-uppercase"
              >
                Join the PROs
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Free Tier --> */}
        <div class="col-lg-6">
          <div class="card mb-5 mb-lg-0">
            <div class="card-body">
              <h5 class="card-title text-muted text-uppercase text-center">
                Free
              </h5>
              <h6 class="card-price text-center">
                $0<span class="period">/month</span>
              </h6>
              <hr />
              <ul class="fa-ul">
                {freePackages.map((item) => (
                  <li class={!item.available && "text-muted"}>
                    <span class="fa-li">
                      {item.available ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <a href="#" class="btn btn-block btn-primary text-uppercase">
                Start now{" "}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "100px" }}></div>
    </section>
  );
};

export default Pricing;
