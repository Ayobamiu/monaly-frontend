import React, { useEffect, useState } from "react";
import "./css/style.css";
import sneakers from "../../../assets/images/sneakers.webp";
import sneakers2 from "../../../assets/images/sneakers2.webp";
import BackButton from "../../includes/BackButton/BackButton";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StepWizard from "react-step-wizard";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import { loadCarts, placeOrder } from "../../../store/productSlice";
import { loadLoggedInUser } from "../../../store/authSlice";
import { getAddress } from "../../../assets/js/getAddress";

const CheckoutPage = (props) => {
  useEffect(() => {
    // getEstimate("GoKada");
  }, []);
  const dispatch = useDispatch();
  const addresses = [1, 2];
  const carts = useSelector((state) => state.app.products.carts);
  const storeAddress = useSelector((state) => state.app.products.storeAddress);
  const shippingFee = useSelector((state) => state.app.products.shippingFee);
  useEffect(() => {
    dispatch(loadCarts());
    dispatch(loadLoggedInUser());
  }, []);

  let total = 0;
  for (let index = 0; index < carts.length; index++) {
    const cart = carts[index];
    total += cart.product.price * cart.quantity;
  }

  const showAddress = async (lat, lon) => {
    const result = await getAddress(lat, lon);
    console.log("address", result);
  };
  const [deliveryMethod, setDeliveryMethod] = useState("pickUp");
  const [loadingDeliveryMerchant, setLoadingDeliveryMerchant] = useState(false);
  const [deliveryMerchant, setDeliveryMerchant] = useState("Monaly Express");
  const [merchants, setMerchants] = useState([{ name: "GoKada" }]);
  const [shipping, setShipping] = useState(shippingFee);
  const [showFAdeText, setShowFAdeText] = useState(false);
  const [dileveryAddress, setDileveryAddress] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressEmail, setAddressEmail] = useState("");
  const [addressAddress, setAddressAddress] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  console.log("merchants", merchants);

  const CustomLabel = ({ name, id, price, description }) => {
    return (
      <label htmlFor={id} className="text-medium mx-2 w-100 mb-0">
        <div className="d-flex justify-content-between align-items-center w-100 ">
          <span>
            {name} <small className="text-muted">{description}</small>
          </span>
          <span>N{price}</span>
        </div>
      </label>
    );
  };

  const getLatLong = async (key, address) => {
    const result = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${key}&query=${address}`
    );
    console.log("result", result);
  };
  const getEstimate = async (
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    dropoff_address,
    dropoff_latitude,
    dropoff_longitude
  ) => {
    setLoadingDeliveryMerchant(true);
    try {
      for (let index = 0; index < merchants.length; index++) {
        const merchant = merchants[index];
        const details = await axios.post(
          "https://api.gokada.ng/api/developer/v3/order_estimate",
          {
            pickup_address,
            pickup_latitude,
            pickup_longitude,
            dropoffs: [
              {
                dropoff_address,
                dropoff_latitude,
                dropoff_longitude,
              },
            ],
            api_key:
              "0Ornc6TGYMRiXs14h66tfVdEmnUqMRYYiaH04cxzSKHe9Z0d5L3qNdkfGQ9e_test",
          }
        );
        merchant.data = details.data;
      }
      setLoadingDeliveryMerchant(false);
    } catch (error) {
      setLoadingDeliveryMerchant(false);
      console.log("error", error);
    }
  };

  const FormOne = (props) => {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="link-large">Select Delivery Address</p>
          <button
            className="btn btn-primary monaly-primary"
            onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          >
            Add New
          </button>
        </div>
        {showNewAddressForm && (
          <div
            className="card-body border rounded rounded-4 my-3"
            id="newAddressForm"
          >
            <p className="link-large">Enter Delivery Address</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getLatLong("3b4c10a64fff96eaf6167a0c4c3926d5", addressAddress);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                className="form-control  my-3"
                required={deliveryMethod === "toDoor"}
                onChange={(e) => setAddressName(e.target.val)}
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control  my-3"
                placeholder="Phone"
                required={deliveryMethod === "toDoor"}
                onChange={(e) => setAddressPhone(e.target.val)}
              />
              <input
                type="email"
                name="email"
                id="email"
                className="form-control  my-3"
                placeholder="Email Address"
                required={deliveryMethod === "toDoor"}
                onChange={(e) => {
                  setAddressEmail(e.target.val);
                  //use address to pre-fill zip, latitude and longitude
                }}
              />
              <input
                type="text"
                name="address"
                id="address"
                className="form-control  my-3"
                placeholder="Address"
                required={deliveryMethod === "toDoor"}
                onChange={(e) => setAddressAddress(e.target.val)}
              />

              <input
                type="submit"
                value="Add new"
                className="my-3 btn btn-primary"
              />
            </form>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.nextStep();
          }}
        >
          <div className="form-200">
            {addresses.length === 0 && (
              <div className=" card-body text-center border rounded rounded-4">
                <p className="text-medium">Add a new Address to get started</p>
                <butoon
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#newAddressForm"
                  role="button"
                  aria-expanded="false"
                  aria-controls="newAddressForm"
                >
                  Add new
                </butoon>
              </div>
            )}
            {addresses.map((address, index) => (
              <div className="d-flex align-items-center my-2">
                <input
                  type="radio"
                  name="shippingAddress"
                  value={`shippingAddress${index}`}
                  id={`shippingAddress${index}`}
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setDileveryAddress(e.target.value)}
                />
                <label
                  htmlFor={`shippingAddress${index}`}
                  className="mb-0 card p-3 border rounded rounded-4 mx-2"
                >
                  <small className="text-x-small text-success d-block">
                    Ayobami Usman
                  </small>

                  <span className="text-x-small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus, et.
                  </span>
                </label>{" "}
              </div>
            ))}
          </div>

          <input
            type="submit"
            value="Continue"
            className="form-control form-control-lg my-3 btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  };
  const FormTwo = (props) => {
    return (
      <div>
        {merchants && merchants.length > 0 && (
          <p className="link-large">Select Delivery Merchant</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.previousStep();
          }}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              name="deliveryMerchant"
              id="Monaly Express"
              value={1000}
              onChange={(e) => {
                setDeliveryMerchant("Monaly Express");
                setShipping(e.target.value);
              }}
              required={deliveryMethod === "toDoor"}
            />
            <CustomLabel
              description="24 Hours"
              name="Monaly Express"
              id="Monaly Express"
              price={1000}
            />
          </div>
          {/* {merchants &&
            merchants.length > 0 &&
            merchants.map((merchant) => (
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="deliveryMerchant"
                  id={merchant && merchant.name}
                  value={merchant && merchant.data && merchant.data.fare}
                  onChange={(e) => {
                    setDeliveryMerchant(merchant && merchant.name);
                    setShipping(e.target.value);
                  }}
                  required={deliveryMethod === "toDoor"}
                />
                <CustomLabel
                  description={`${
                    (merchant && merchant.data && merchant.data.time) || 0
                  } Hours`}
                  name={merchant && merchant.name}
                  id={merchant && merchant.name}
                  price={(merchant && merchant.data && merchant.data.fare) || 0}
                />
              </div>
            ))} */}
          {/* {merchants && merchants.length === 0 && (
            <div className="card dashed my-5 p-3">
              <div className="card-body text-center text-muted">
                <span>
                  Enter shipping address to get list of delivery merchants
                </span>
                <div className="loader"></div>
              </div>
            </div>
          )} */}

          <br />
          <input type="submit" value="Continue" />
        </form>
      </div>
    );
  };
  const fade = () => {
    setShowFAdeText(true);
    setTimeout(() => {
      setShowFAdeText(false);
    }, 3000);
  };
  const config = {
    public_key: "FLWPUBK-2e47da611ef1439c41b6685671258d8f-X",
    tx_ref: Date.now(),
    // amount: Number(total) + Number(shipping),
    amount: 10,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: "ayobamu@gmail.com",
    },
    customizations: {
      title: "MY Store",
    },
  };
  // const handleFlutterPayment = useFlutterwave(config);
  const pay = () => {
    dispatch(
      placeOrder(carts, total, shippingFee, deliveryMethod, deliveryMerchant)
    );
    // handleFlutterPayment({
    //   callback: (response) => {
    //     if (response.status === "successful") {
    //       console.log(response);
    //       dispatch(placeOrder(carts, total, shippingFee));
    //     }
    //     closePaymentModal(); // this will close the modal programmatically
    //   },
    //   onClose: () => {},
    // });
  };
  return (
    <div id="checoutPage">
      <BackButton text="Checkout" props={props} />
      <div className="container">
        <p>Click the button to get your coordinates.</p>
        <button onClick={() => showAddress("6.2222", "3.7674")}>
          Location
        </button>

        <div className="row align-items-start my-5 flex-wrap">
          <div className="col-md-8 col-12">
            <p className="link-large">Select Delivery Method</p>

            <input
              type="radio"
              name="deliveryMethod"
              id="pickUp"
              value="pickUp"
              defaultChecked
              onChange={(e) => {
                setShipping(0);
                setDeliveryMethod(e.target.value);
              }}
            />
            <label htmlFor="pickUp" className="text-medium mx-2">
              Pick Up
            </label>
            <br />
            <small className="text-muted">
              Our office is at Shop 6, Computer Village Ikeja, Lagos. You can
              reach us on 08036137042. We are open for pickup between hours of
              8am and 7pm everyday of the week.
            </small>
            <br />
            <input
              type="radio"
              name="deliveryMethod"
              id="toDoor"
              value="toDoor"
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <label htmlFor="toDoor" className="text-medium mx-2">
              Door Step Delivery
            </label>
            {deliveryMethod === "toDoor" && (
              <StepWizard>
                <FormOne />
                <FormTwo />
              </StepWizard>
            )}
          </div>
          <div className="col-md-4 col-12 hide-900">
            <div className="card border p-3 rounded  ">
              <div className="link-small">
                Sub-Total: <span className="text-muted">NGN {total}</span>
              </div>
              <div className="link-small">
                Shipping: <span className="text-muted">NGN {shipping}</span>
              </div>
              <div className="display-small">
                Total:{" "}
                <span className="text-muted">
                  NGN {Number(total) + Number(shipping)}
                </span>
              </div>

              <button
                className="primary-btn my-2"
                onClick={() => {
                  fade();
                  pay();
                }}
              >
                Checkout
              </button>
              {showFAdeText && (
                <span className="text-small text-success">
                  Order request successful.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed-bottom bg-white border-top p-3 container show-900">
        <div className="row g-2">
          <div className="col-6">
            <div className="link-medium">
              Total:{" "}
              <span className="link-medium text-muted">
                NGN {Number(total) + Number(shipping)}
              </span>
            </div>
            <div className="text-x-small">
              <small className=" text-muted">
                NGN {total} + NGN {shipping}
              </small>
            </div>
          </div>
          <div className="col-6">
            <button
              className="primary-btn my-2 custom-btn-sm "
              onClick={() => {
                fade();
                pay();
              }}
            >
              Checkout
            </button>
          </div>
        </div>
        {showFAdeText && (
          <span className="text-small text-success">
            Order request successful.
          </span>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
