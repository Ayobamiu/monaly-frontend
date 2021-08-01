import React, { useEffect, useState } from "react";
import "./css/style.css";
import BackButton from "../../includes/BackButton/BackButton";
import axios from "axios";
import StepWizard from "react-step-wizard";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import { loadCarts, placeOrder } from "../../../store/productSlice";
import { addUserAddress, loadLoggedInUser } from "../../../store/authSlice";
import { getAddress, getAddressV2 } from "../../../assets/js/getAddress";

const CheckoutPage = (props) => {
  useEffect(() => {
    // getEstimate("GoKada");
  }, []);
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.app.user.profile.addresses);
  const addAddressStatus = useSelector(
    (state) => state.app.user.addAddressStatus
  );
  const carts = useSelector((state) => state.app.products.carts);
  console.log("carts", carts);
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
  const [addressState, setAddressState] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [gettingLatLong, setGettingLatLong] = useState(false);

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

  console.log(
    "getAddressV2",
    getAddressV2("3b4c10a64fff96eaf6167a0c4c3926d5", 40.7638435, -73.9729691)
  );

  const getLatLong = async (key, address) => {
    const result = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${key}&query=${address}`
    );
    const confidences = [];
    for (let index = 0; index < result.data.data.length; index++) {
      const data = result.data.data[index];
      confidences.push(data.confidence);
    }
    var max_of_array = Math.max.apply(Math, confidences);
    const target = result.data.data.find(
      (item) => item.confidence === max_of_array
    );
    console.log("target && target.latitude", target && target.latitude);
    setLatitude(target && target.latitude);
    setLongitude(target && target.longitude);
    setAddressCountry(target && target.country);
    console.log("target && target.country", target && target.country);
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

  // if (latitude && longitude) {
  // }
  const FormOne = (props) => {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="link-large">Select Delivery Address</p>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add new
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (addresses.length > 0) {
              props.nextStep();
              getEstimate(
                storeAddress.address,
                storeAddress.latitude,
                storeAddress.longitude,
                addressAddress,
                latitude,
                longitude
              );
            }
          }}
        >
          <div className="form-200">
            {addresses.length === 0 && (
              <div className=" card-body text-center border rounded rounded-4">
                <p className="text-medium">Add a new Address to get started</p>
              </div>
            )}
            {addresses.map((address, index) => (
              <div className="d-flex align-items-center my-2 0" key={index}>
                <input
                  type="radio"
                  name="shippingAddress"
                  value={address._id}
                  id={`shippingAddress${index}`}
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => {
                    setDileveryAddress(e.target.value);
                    setLatitude(address.latitude);
                    setLongitude(address.longitude);
                    setAddressAddress(address.address);
                  }}
                />
                <label
                  htmlFor={`shippingAddress${index}`}
                  className="mb-0 card p-3 border rounded rounded-4 mx-2 w-100"
                >
                  <small className="text-x-small text-success d-block">
                    {address.name}
                  </small>

                  <span className="text-x-small">
                    {address.address + " " + address.state}
                  </span>
                  <small className="text-x-small text-secondary d-block">
                    {address.phoneNumber}
                  </small>
                </label>{" "}
              </div>
            ))}
          </div>

          <input
            type="submit"
            value="Continue"
            className=" my-2 btn btn-primary"
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
          {loadingDeliveryMerchant && <div className="loader"></div>}
          {merchants &&
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
            ))}
          {merchants && merchants.length === 0 && (
            <div className="card dashed my-5 p-3">
              <div className="card-body text-center text-muted">
                <span>
                  Enter shipping address to get list of delivery merchants
                </span>
                <div className="loader"></div>
              </div>
            </div>
          )}

          <br />
          <input type="submit" value="Back" />
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
    console.log("order data", {
      carts,
      total,
      shippingFee,
      deliveryMethod,
      deliveryMerchant,
      dileveryAddress,
    });
    dispatch(
      placeOrder(
        carts,
        total,
        shippingFee,
        deliveryMethod,
        deliveryMerchant,
        dileveryAddress
      )
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

            <div className="collapse" id="pickUpDetails">
              {storeAddress.allowPickup ? (
                <small className="text-muted">
                  Pick Up Address:{storeAddress.address}
                </small>
              ) : (
                <small className="text-muted">Pick up not Available</small>
              )}
            </div>
            <a
              href="#"
              data-bs-toggle="collapse"
              href="#pickUpDetails"
              role="button"
              aria-expanded="false"
              aria-controls="pickUpDetails"
            >
              See pick up details..
            </a>
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
              <div className="my-3">
                <StepWizard>
                  <FormOne />
                  <FormTwo />
                </StepWizard>
              </div>
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

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setGettingLatLong(true);
                await getLatLong(
                  "3b4c10a64fff96eaf6167a0c4c3926d5",
                  addressAddress + " " + addressCity
                );
                setGettingLatLong(false);
                dispatch(
                  addUserAddress({
                    name: addressName,
                    address: addressAddress,
                    email: addressEmail,
                    city: addressCity,
                    state: addressState,
                    country: addressCountry,
                    zip: addressZip,
                    phoneNumber: addressPhone,
                    latitude,
                    longitude,
                  })
                );
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Enter Delivery Address
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  className="form-control  my-3"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressName(e.target.value)}
                />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control  my-3"
                  placeholder="Phone"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressPhone(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control  my-3"
                  placeholder="Email Address"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => {
                    setAddressEmail(e.target.value);
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
                  onChange={(e) => {
                    setAddressAddress(e.target.value);
                  }}
                />
                <input
                  type="number"
                  name="zip"
                  id="zip"
                  className="form-control  my-3"
                  placeholder="Postal Code"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressZip(e.target.value)}
                />
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control  my-3"
                  placeholder="City"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressCity(e.target.value)}
                />
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="form-control  my-3"
                  placeholder="State"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressState(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                {gettingLatLong && <span className="loader"></span>}
                <span className="text-x-small me-auto">{addAddressStatus}</span>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  disabled={gettingLatLong}
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
