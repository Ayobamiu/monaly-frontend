import React, { useContext, useEffect, useState } from "react";
import "./css/style.css";
import BackButton from "../../includes/BackButton/BackButton";
import axios from "axios";
import StepWizard from "react-step-wizard";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSandBox,
  loadStoreById,
  placeOrder,
} from "../../../store/productSlice";
import {
  addUserAddress,
  loadLoggedInUser,
  user,
} from "../../../store/authSlice";
import { getCitiess, getStates } from "../../../assets/js/getAddress";
import CartContext from "../../../store/contexts/cartContext";
import { saveToLocalStorage } from "../../../assets/js/localStorage";

const CheckoutPage = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(user);
  const loadingUser = useSelector((state) => state.app.user.loading);
  const addresses = useSelector((state) => state.app.user.profile.addresses);
  const addAddressStatus = useSelector(
    (state) => state.app.user.addAddressStatus
  );
  const { carts } = useContext(CartContext);
  const storeAddress = useSelector((state) => state.app.products.store);
  const sandBoxLoading = useSelector(
    (state) => state.app.products.sandBoxLoading
  );
  const sandBox = useSelector((state) => state.app.products.sandBox);
  const loadingCarts = useSelector((state) => state.app.products.loadingCarts);
  const orderLoading = useSelector((state) => state.app.products.orderLoading);
  const shippingFee = useSelector((state) => state.app.products.shippingFee);

  const [deliveryMethod, setDeliveryMethod] = useState("pickUp");
  const [deliveryMerchant, setDeliveryMerchant] = useState("Monaly Express");
  const [courier, setCourier] = useState("");
  const [shipping, setShipping] = useState(shippingFee);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showFAdeText, setShowFAdeText] = useState(false);
  const [dileveryAddress, setDileveryAddress] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressEmail, setAddressEmail] = useState("");
  const [addressAddress, setAddressAddress] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressStateCode, setAddressStateCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [gettingLatLong, setGettingLatLong] = useState(false);
  const selectedAddress = addresses.find((i) => i._id === dileveryAddress);
  const dispatchProducts = carts.map((i) => {
    return {
      name: i.title,
      quantity: i.quantity,
      weight: "1",
      amount: i.price,
      value: i.quantity * i.price,
    };
  });
  const getSandboxEstimate = async () => {
    // await loadSandBox();
    // dispatch(
    //   loadSandBox({
    //     origin_name: profile.firstName + profile.lastName,
    //     origin_phone: "+2348036137042",
    //     origin_street: selectedAddress.address,
    //     origin_city: "Ikorodu",
    //     origin_country: selectedAddress.city,
    //     origin_country_code: "NG",
    //     origin_state: selectedAddress.state,
    //     origin_state_code: "LOS",
    //     destination_name: storeAddress.name,
    //     destination_phone: storeAddress.phoneOne,
    //     destination_street: storeAddress.location.label,
    //     destination_city: storeAddress.location.region,
    //     destination_country: storeAddress.location.country,
    //     destination_country_code: storeAddress.location.country_code,
    //     destination_state: storeAddress.location.region,
    //     destination_state_code: storeAddress.location.region_code,
    //     weight: "0.5",
    //     items: dispatchProducts,
    //   })
    // );
    console.log("load sendbox", {
      origin_name: storeAddress.name,
      origin_phone: storeAddress.phoneOne,
      origin_street: storeAddress?.location?.label,
      origin_city: storeAddress?.location?.region,
      origin_country: storeAddress?.location?.country,
      origin_country_code: "NG",
      origin_state: storeAddress?.location?.region,
      origin_state_code: storeAddress?.location?.region_code,
      destination_name: addressName,
      destination_phone: addressPhone,
      destination_street: addressAddress,
      destination_city: addressCity,
      destination_country: "NIGERIA",
      destination_country_code: "NG",
      destination_state: addressState,
      destination_state_code: addressStateCode,
      weight: "0.5",
      items: dispatchProducts,
    });
    dispatch(
      loadSandBox({
        origin_name: storeAddress.name,
        origin_phone: storeAddress.phoneOne,
        origin_street: storeAddress?.location?.label,
        origin_city: storeAddress?.location?.region,
        origin_country: storeAddress?.location?.country,
        origin_country_code: "NG",
        origin_state: storeAddress?.location?.region,
        origin_state_code: storeAddress?.location?.region_code,
        destination_name: selectedAddress.name,
        destination_phone: selectedAddress.phoneNumber,
        destination_street: selectedAddress.address,
        destination_city: selectedAddress.city,
        destination_country: selectedAddress.country,
        destination_country_code: selectedAddress.country_code,
        destination_state: selectedAddress.state,
        destination_state_code: selectedAddress.state_code,
        weight: "0.5",
        items: dispatchProducts,
      })
    );
  };
  useEffect(() => {
    // dispatch(loadCarts());
    if (carts?.length && carts?.length > 0) {
      dispatch(loadStoreById(carts[0]?.store));
    }

    dispatch(loadLoggedInUser());
    (async () => {
      const coo = await getStates("NG");
      setStates([...coo]);
    })();
    // ()();
  }, [carts, dispatch]);

  let total = 0;
  for (let index = 0; index < carts.length; index++) {
    const cart = carts[index];
    total += cart.price * cart.quantity;
  }

  const CustomLabel = ({ name, id, price, description }) => {
    return (
      <label htmlFor={id} className="text-medium mx-2 w-100 mb-3">
        <div className="d-flex justify-content-between align-items-center w-100 ">
          <span>
            {name} <small className="text-muted d-block">{description}</small>
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
    const confidences = [];
    for (let index = 0; index < result.data.data.length; index++) {
      const data = result.data.data[index];
      confidences.push(data.confidence);
    }
    var max_of_array = Math.max.apply(Math, confidences);
    const target = result.data.data.find(
      (item) => item.confidence === max_of_array
    );
    setLatitude(target && target.latitude);
    setLongitude(target && target.longitude);
    setAddressCountry(target && target.country);
  };

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
              // getEstimate(
              //   storeAddress.address,
              //   storeAddress.location.latitude,
              //   storeAddress.location.longitude,
              //   addressAddress,
              //   latitude,
              //   longitude
              // );
              getSandboxEstimate();
            }
          }}
        >
          <div className="form-200">
            {!loadingUser && addresses.length === 0 && (
              <div className=" card-body text-center border rounded rounded-4">
                <p className="text-medium">Add a new Address to get started</p>
              </div>
            )}
            {loadingUser && <div className="loader"></div>}
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
                    setShippingAddress(address);
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
        <p className="link-large">Select Delivery Merchant</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.previousStep();
          }}
        >
          {sandBoxLoading && <div className="loader"></div>}
          {sandBox &&
            sandBox?.rates?.map((i) => (
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="deliveryMerchant"
                  id={i?.id}
                  value={i?.fee}
                  onChange={(e) => {
                    e.preventDefault();
                    setDeliveryMerchant(i.name);
                    setShipping(i?.fee);
                    setCourier(i?.courier_id);
                    // setCourier({
                    //   origin_name: "Mrs. Hippo",
                    //   origin_phone: "+2348170441446",
                    //   origin_street: "Clayton St.",
                    //   origin_city: "Ikorodu",
                    //   origin_country: "NIGERIA",
                    //   origin_country_code: "NG",
                    //   origin_state: "Lagos",
                    //   origin_state_code: "LOS",
                    //   destination_name: "Brian",
                    //   destination_phone: "+2348170441446",
                    //   destination_street: "Drydock Ave Suite 610",
                    //   destination_city: "Ikeja",
                    //   destination_country: "NIGERIA",
                    //   destination_country_code: "NG",
                    //   destination_state: "Lagos",
                    //   destination_state_code: "LOS",
                    //   weight: "0.5",
                    //   items: dispatchProducts,
                    //   selected_courier_id: i.id,
                    //   channel_code: "api",
                    // });
                  }}
                  required={deliveryMethod === "toDoor"}
                  // defaultChecked={deliveryMethod === "toDoor"}
                />
                <CustomLabel
                  description={i?.description}
                  name={i.name}
                  id={i.name}
                  price={i?.fee}
                />
              </div>
            ))}

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
    // public_key: "FLWPUBK-2e47da611ef1439c41b6685671258d8f-X",
    public_key: "FLWPUBK_TEST-59d8c0ddd33f5d7ceed591f757f3df47-X",
    tx_ref: Date.now(),
    amount: Number(total) + Number(shipping),
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: userProfile.email,
    },
    customizations: {
      title: "Monaly Inc",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  const pay = () => {
    console.log("Pay data", {
      carts,
      total: Number(total) + Number(shipping),
      shippingFee: Number(shipping),
      deliveryMethod,
      deliveryMerchant,
      dileveryAddress,
      shippinData:
        deliveryMethod === "pickUp"
          ? null
          : {
              origin_name: storeAddress.name,
              origin_phone: storeAddress.phoneOne,
              origin_street: storeAddress?.location?.label,
              origin_city: storeAddress?.location?.region,
              origin_country: storeAddress?.location?.country,
              origin_country_code: "NG",
              origin_state: storeAddress?.location?.region,
              origin_state_code: storeAddress?.location?.region_code,
              destination_name: shippingAddress.name,
              destination_phone: shippingAddress.phoneNumber,
              destination_street: shippingAddress.address,
              destination_city: shippingAddress.city,
              destination_country: shippingAddress.country,
              destination_country_code: "NG",
              destination_state: shippingAddress.state,
              destination_state_code: shippingAddress.state_code,
              weight: "0.5",
              items: dispatchProducts,
              selected_courier_id: courier,
              channel_code: "api",
            },
    });

    saveToLocalStorage("carts", []);
    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          dispatch(
            placeOrder(
              carts,
              Number(total) + Number(shipping),
              Number(shipping),
              deliveryMethod,
              deliveryMerchant,
              dileveryAddress,
              deliveryMethod === "pickUp"
                ? null
                : {
                    origin_name: storeAddress.name,
                    origin_phone: storeAddress.phoneOne,
                    origin_street: storeAddress?.location?.label,
                    origin_city: storeAddress?.location?.region,
                    origin_country: storeAddress?.location?.country,
                    origin_country_code: "NG",
                    origin_state: storeAddress?.location?.region,
                    origin_state_code: storeAddress?.location?.region_code,
                    destination_name: shippingAddress.name,
                    destination_phone: shippingAddress.phoneNumber,
                    destination_street: shippingAddress.address,
                    destination_city: shippingAddress.city,
                    destination_country: shippingAddress.country,
                    destination_country_code: "NG",
                    destination_state: shippingAddress.state,
                    destination_state_code: shippingAddress.state_code,
                    weight: "0.5",
                    items: dispatchProducts,
                    selected_courier_id: courier,
                    channel_code: "api",
                  }
            )
          );
          // dispatch(
          //   addTransaction({
          //     description: "Withdrawal to my own account",
          //     amount: total,
          //     data: response.data,
          //   })
          // );
          saveToLocalStorage("carts", []);
          window.location = "/pay-redirect";
        }
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };
  return (
    <div id="checoutPage">
      {orderLoading && (
        <div className="loader-full">
          <div className="loader"></div>
        </div>
      )}
      {loadingCarts && (
        <div className="loader-full">
          <div className="loader"></div>
        </div>
      )}
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
                  addressCity + " " + addressState
                );
                setGettingLatLong(false);
                dispatch(
                  addUserAddress({
                    name: addressName,
                    address: addressAddress,
                    email: addressEmail,
                    city: addressCity,
                    state: addressState,
                    state_code: addressStateCode,
                    country_code: "NG",
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

                <select
                  name="state"
                  className="form-select  my-3"
                  id="state"
                  onChange={async (e) => {
                    const selected = states.find(
                      (i) => i.id.toString() === e.target.value
                    );
                    setAddressState(selected.name);
                    setAddressStateCode(selected.iso2);
                    const nnn = await getCitiess("NG", selected.iso2);
                    setCities([...nnn]);
                  }}
                >
                  {states
                    .sort(function (a, b) {
                      var textA = a.name.toUpperCase();
                      var textB = b.name.toUpperCase();
                      return textA < textB ? -1 : textA > textB ? 1 : 0;
                    })
                    .map((i, index) => (
                      <option key={index} value={i.id}>
                        {i?.name}
                      </option>
                    ))}
                </select>
                <select
                  className="form-select  my-3"
                  name="city"
                  id="city"
                  onChange={async (e) => {
                    const selected = cities.find(
                      (i) => i.id.toString() === e.target.value
                    );
                    setAddressCity(selected.name);
                  }}
                >
                  {cities
                    .sort(function (a, b) {
                      var textA = a.name.toUpperCase();
                      var textB = b.name.toUpperCase();
                      return textA < textB ? -1 : textA > textB ? 1 : 0;
                    })
                    .map((i, index) => (
                      <option key={index} value={i.id}>
                        {i?.name}
                      </option>
                    ))}
                </select>
                {/* <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control  my-3"
                  placeholder="City"
                  required={deliveryMethod === "toDoor"}
                  onChange={(e) => setAddressCity(e.target.value)}
                /> */}
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
