import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { freePackages, proPackages } from "../../../assets/js/controls";
import "./css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { addSubscription, userHasAnActiveSub } from "../../../store/authSlice";

const Pricing = () => {
  const user = useSelector((state) => state.app.user.profile);
  const dispatch = useDispatch();
  const isSubscribed = useSelector(userHasAnActiveSub);

  const config = {
    public_key: "FLWPUBK_TEST-5120f20f66db336ffc0f6131bcc49936-X",
    tx_ref: Date.now(),
    payment_plan: 11193,
    amount: 5,
    currency: "USD",
    payment_options: "card",
    customer: {
      email: user.email,
      name: user.firstName,
    },
    customizations: {
      title: "Monaly PRO",
      description: "Subscription to Monaly PRO",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <section class="pricing ">
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

              {!isSubscribed && (
                <button
                  class="btn btn-block btn-primary text-uppercase my-2"
                  onClick={() => {
                    handleFlutterPayment({
                      callback: (response) => {
                        if (response.status === "successful") {
                          dispatch(addSubscription());
                        }
                        closePaymentModal(); // this will close the modal programmatically
                      },
                      onClose: () => {},
                    });
                  }}
                >
                  Join the PROs
                </button>
              )}
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
              {!isSubscribed && (
                <button
                  class="btn btn-block btn-primary text-uppercase my-2"
                  onClick={() => {
                    handleFlutterPayment({
                      callback: (response) => {
                        console.log(response);
                        if (response.status === "successful") {
                          dispatch(addSubscription());
                        }
                        closePaymentModal(); // this will close the modal programmatically
                      },

                      onClose: () => {},
                    });
                  }}
                >
                  Join the PROs
                </button>
              )}
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
