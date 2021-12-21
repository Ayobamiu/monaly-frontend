/** @format */

import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faMapMarkerAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {
  getCitiess,
  getCountries,
  getStates,
} from "../../../assets/js/getAddress";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../assets/js/localStorage";
import CustomInput from "../../includes/CustomInput/CustomInput";
import "./css/styles.css";

export default function CartPlusCheckout() {
  const products = [
    {
      title: "Product 1",
      price: 100,
      _id: "100",
      image: "https://picsum.photos/100",
    },
    {
      title: "Product 2",
      price: 200,
      _id: "200",
      image: "https://picsum.photos/200",
    },
    {
      title: "Product 3",
      price: 300,
      _id: "300",
      image: "https://picsum.photos/300",
    },
    {
      title: "Product 4",
      price: 400,
      _id: "400",
      image: "https://picsum.photos/400",
    },
    {
      title: "Product 5",
      price: 500,
      _id: "500",
      image: "https://picsum.photos/500",
    },
    {
      title: "Product 6",
      price: 600,
      _id: "600",
      image: "https://picsum.photos/600",
    },
    {
      title: "Product 7",
      price: 700,
      _id: "700",
      image: "https://picsum.photos/700",
    },
    {
      title: "Product 8",
      price: 800,
      _id: "800",
      image: "https://picsum.photos/800",
    },
    {
      title: "Product 9",
      price: 900,
      _id: "900",
      image: "https://picsum.photos/900",
    },
    {
      title: "Product 10",
      price: 1000,
      _id: "1000",
      image: "https://picsum.photos/1000",
    },
  ];
  const [orders, setOrders] = useState([]);
  const [addresses] = useState([
    {
      label:
        "6, Gbemisola street, Allen Avenue, Ikeja Lagos.6, Gbemisola street, Allen Avenue, Ikeja Lagos.",
    },
    {
      label:
        "7, Gbemisola street, Allen Avenue, Ikeja Lagos.6, Gbemisola street, Allen Avenue, Ikeja Lagos.",
    },
    {
      label:
        "8, Gbemisola street, Allen Avenue, Ikeja Lagos.6, Gbemisola street, Allen Avenue, Ikeja Lagos.",
    },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showHiddenCart, setShowHiddenCart] = useState(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(addresses[0]);
  const [merchants] = useState([
    {
      name: "Pick Up",
      price: 100,
      eta: Date.now().toString(),
    },
    {
      name: "GoKada",
      price: 300,
      eta: Date.now().toString(),
    },
    {
      name: "Kwiki",
      price: 500,
      eta: Date.now().toString(),
    },
  ]);
  const [merchant, setMerchant] = useState(merchants[0]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState(null);
  console.log("state", state);
  const [city, setCity] = useState(null);
  console.log("city", city);
  const [newFullName, setNewFullName] = useState("");
  console.log("newFullName", newFullName);
  const [newAddress, setNewAddress] = useState("");
  console.log("newAddress", newAddress);
  const [newPhone, setNewPhone] = useState("");
  console.log("newPhone", newPhone);

  const [country, setCountry] = useState(null);

  useEffect(() => {
    const result = getFromLocalStorage("orders");
    if (result && result.length) {
      setOrders([...result]);
    }
    (async () => {
      const data = await getCountries();
      setCountries(data);
    })();
  }, []);
  const addToCart = (product) => {
    const data = [...orders, { ...product, quantity: 1 }];
    setOrders((initialState) => [...data]);
    saveToLocalStorage("orders", data);
  };
  const removeFromCart = (product) => {
    const currentOrders = orders;
    const targetIndex = currentOrders.findIndex((i) => i._id === product._id);
    currentOrders.splice(targetIndex, 1);
    setOrders((initialState) => [...currentOrders]);
    saveToLocalStorage("orders", currentOrders);
  };
  const updateCart = (product) => {
    const currentOrders = orders;
    const targetIndex = currentOrders.findIndex((i) => i._id === product._id);
    currentOrders.splice(targetIndex, 1, product);
    setOrders((initialState) => [...currentOrders]);
    saveToLocalStorage("orders", currentOrders);
  };
  const checkout = () => {
    const orderData = {
      orders,
      address,
      merchant,
    };
    console.log("orderData", orderData);
    setOrders((initialState) => []);
    saveToLocalStorage("orders", []);
    window.location.replace("/pay-redirect");
  };

  const Canva = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <div className='d-flex canvas'>
        <div className='off-canvas'>
          <div className='d-flex justify-content-between'>
            <span className='ml-auto mr-3 my-3' onClick={() => setShow(!show)}>
              &#10005;
            </span>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <span>Please select shipping Address:</span>
            <button
              class='btn btn-link'
              onClick={() => setShowAddAddress(!showAddAddress)}>
              Add new
            </button>
          </div>
          {addresses.map((i, index) => (
            <div>
              <input
                type='radio'
                id={`address${index}`}
                name='shippingMethod'
                value={i}
                checked={address === i}
                onChange={() => setAddress(i)}
              />{" "}
              <label className='styled-label' for={`address${index}`}>
                {i.label}
              </label>
            </div>
          ))}
        </div>
        <div className='close-canvas' onClick={() => setShow(!show)}></div>
      </div>
    );
  };
  const HiddenCart = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <div className='canvas px-2 scroll-y p-2 pb-5  bg-light'>
        <span
          className='float-right mx-2'
          onClick={() => setShowHiddenCart(!showHiddenCart)}>
          &#10005;
        </span>
        <Cart />
      </div>
    );
  };
  const AddAddress = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <div className='canvas px-2 scroll-y p-2 pb-5  bg-light d-flex'>
        <div className='off-canvas'>
          <span
            className='float-right mx-2'
            onClick={() => setShowAddAddress(!showAddAddress)}>
            &#10005;
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUserAddress();
            }}
            className='container my-4'>
            <h5 class='modal-title' id='addAddressModalLabel'>
              Add new Address
            </h5>
            <CustomInput
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder='Full Name'
              type='text'
              required
              id='fullName'
            />
            <CustomInput
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder='Phone Number'
              type='phone'
              required
              id='phone'
            />
            <CustomInput
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder=' Address'
              type='text'
              required
              id='newAddress'
            />
            <div className='custom-input'>
              <div className='input-inner h-100'>
                <select
                  required
                  name='select'
                  id='Selectid'
                  className='w-100 h-100 bg-transparent border-0'
                  onChange={async (e) => {
                    e.preventDefault();
                    setCountry(countries[e.target.value]);
                    const data = await getStates(
                      countries[e.target.value]?.iso2
                    );
                    setStates(data);
                  }}>
                  <option value='' disabled selected>
                    Select Country
                  </option>
                  {countries.map((i, index) => (
                    <option value={index}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='custom-input'>
              <div className='input-inner h-100'>
                <select
                  required
                  name='select'
                  id='cities'
                  className='w-100 h-100 bg-transparent border-0'
                  onChange={async (e) => {
                    setState(states[e.target.value]);
                    const data = await getCitiess(
                      country?.iso2,
                      states[e.target.value]?.iso2
                    );
                    setCities(data);
                  }}>
                  <option value='' disabled selected>
                    Select State
                  </option>
                  {states.map((i, index) => (
                    <option value={index}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='custom-input'>
              <div className='input-inner h-100'>
                <select
                  required
                  name='select'
                  id='cities'
                  className='w-100 h-100 bg-transparent border-0'
                  onChange={async (e) => {
                    setCity(states[e.target.value]);
                  }}>
                  <option value='' disabled selected>
                    Select City
                  </option>
                  {cities.map((i, index) => (
                    <option value={index}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type='submit' class='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
        <div
          className='close-canvas'
          onClick={() => setShowAddAddress(!showAddAddress)}></div>
      </div>
    );
  };
  const Cart = () => {
    return (
      <div>
        <div className='border-bottom'>
          Order
          {orders.map((i) => (
            <div className='order-item  mb-2 d-flex justify-content-between'>
              <div
                className='order-item-img bg-secondary'
                style={{
                  backgroundImage: `url(${i.image})`,
                }}
              />
              <div className='text m-2 text-truncate flex-grow-1'>
                <div className='text-truncate'>{i.title}</div>
                <div>
                  <strong>${i.price}</strong> <small>X</small>{" "}
                  <small>{i.quantity}</small>
                </div>
                <span
                  className='text-danger'
                  onClick={() => {
                    removeFromCart(i);
                  }}>
                  Remove
                </span>
              </div>
              <div className='d-flex flex-column justify-content-around'>
                <div className='icon'>
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    color='white'
                    onClick={() => {
                      updateCart({ ...i, quantity: i.quantity + 1 });
                    }}
                  />
                </div>
                <div className='icon'>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    color='white'
                    onClick={() => {
                      if (i.quantity > 1) {
                        updateCart({ ...i, quantity: i.quantity - 1 });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className='p-2 py-5 border '>Empty Cart</div>
          )}
        </div>
        <div className='border-bottom py-2'>
          <div className='d-flex justify-content-between'>
            <span>Shipping Address</span>
            <button
              className='btn btn-link'
              onClick={() => setShow(!show)}
              // to="/one-click/add"
            >
              Change
            </button>
          </div>

          <div className='border bg-white w-100 p-2 my-2'>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faCheck} />

              <div className='ml-2'>
                {"  "}
                {address.label}
              </div>
            </div>
          </div>
        </div>

        <div className=''>
          <p>Please select shipping method:</p>
          {merchants.map((i, index) => (
            <div>
              <input
                type='radio'
                id={`merchant${index}`}
                name='shippingMethod'
                value={i}
                checked={merchant === i}
                onChange={() => setMerchant(i)}
              />{" "}
              <label className='styled-label' for={`merchant${index}`}>
                <div className='d-flex justify-content-between'>
                  <span>{i.name}</span>
                  <span>&#8358;{i.price}</span>
                </div>
                {/* <span>ETA: {new Date(Date(i.eta)).toUTCString()}</span> */}
              </label>
            </div>
          ))}
        </div>

        <div className='position-fixed bottom-0 bg-white w-100 p-2 '>
          <button
            className='btn btn-primary btn-lg'
            onClick={() => {
              checkout();
            }}
            disabled={orders.length === 0}>
            Checkout
          </button>
          {/* <small className="d-block m-auto">
            Your cart is saved on this device.
          </small> */}
        </div>
      </div>
    );
  };

  const saveUserAddress = () => {
    // setTimeout(() => {
    //   window.location = "/one-click";
    // }, 1000);
  };

  //addToLocalStorage

  return (
    <div className='container-fluid fixed-h-100' id='one-click'>
      <div className='row'>
        <div className='col-lg-8 col-12 fixed-h-100 p-0 scroll-y'>
          <Switch>
            <Route path='/one-click/add'>
              <div
                id='addAddressModal'
                tabindex='-1'
                aria-labelledby='addAddressModalLabel'
                aria-hidden='true'>
                <div class='modal-dialog'>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveUserAddress();
                    }}
                    class='modal-content'>
                    <div class='modal-header'>
                      <h5 class='modal-title' id='addAddressModalLabel'>
                        Add new Address
                      </h5>
                    </div>
                    <div class='modal-body'>
                      <CustomInput
                        onChange={(e) => setNewFullName(e.target.value)}
                        placeholder='Full Name'
                        type='text'
                        required
                        id='fullName'
                      />
                      <CustomInput
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder='Phone Number'
                        type='phone'
                        required
                        id='phone'
                      />
                      <CustomInput
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder=' Address'
                        type='text'
                        required
                        id='newAddress'
                      />
                      <div className='custom-input'>
                        <div className='input-inner h-100'>
                          <select
                            required
                            name='select'
                            id='Selectid'
                            className='w-100 h-100 bg-transparent border-0'
                            onChange={async (e) => {
                              e.preventDefault();
                              setCountry(countries[e.target.value]);
                              const data = await getStates(
                                countries[e.target.value]?.iso2
                              );
                              setStates(data);
                            }}>
                            <option value='' disabled selected>
                              Select Country
                            </option>
                            {countries.map((i, index) => (
                              <option value={index}>{i.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='custom-input'>
                        <div className='input-inner h-100'>
                          <select
                            required
                            name='select'
                            id='cities'
                            className='w-100 h-100 bg-transparent border-0'
                            onChange={async (e) => {
                              setState(states[e.target.value]);
                              const data = await getCitiess(
                                country?.iso2,
                                states[e.target.value]?.iso2
                              );
                              setCities(data);
                            }}>
                            <option value='' disabled selected>
                              Select State
                            </option>
                            {states.map((i, index) => (
                              <option value={index}>{i.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='custom-input'>
                        <div className='input-inner h-100'>
                          <select
                            required
                            name='select'
                            id='cities'
                            className='w-100 h-100 bg-transparent border-0'
                            onChange={async (e) => {
                              setCity(states[e.target.value]);
                            }}>
                            <option value='' disabled selected>
                              Select City
                            </option>
                            {cities.map((i, index) => (
                              <option value={index}>{i.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class='modal-footer'>
                      <button type='submit' class='btn btn-primary'>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Route>
            <Route path='/one-click'>
              <div className='h-120 p-3 d-flex w-100 justify-content-between align-items-center'>
                <div className='d-flex'>
                  <div
                    className='avatar bg-light'
                    style={{
                      backgroundImage: `url('https://picsum.photos/200')`,
                    }}
                  />
                  <div className='ml-2'>
                    <span className='h3 '>Store name</span>
                    <p className=''>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Store location
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size='lg'
                  onClick={() => setShowHiddenCart(!showHiddenCart)}
                  className='d-lg-none'
                />
              </div>
              <div className='d-flex flex-wrap justify-content-around'>
                {products.map((i) => (
                  <div className='box-item'>
                    <div
                      className='box-item-image'
                      style={{ backgroundImage: `url('${i.image}')` }}
                    />
                    <div className='box-item-text p-2'>
                      <span className='text-truncate d-block'>{i.title}</span>
                      <span className='text-truncate d-block'>{i.price}</span>
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                          const exist = orders.find((p) => p._id === i._id);
                          if (exist) {
                            updateCart({
                              ...exist,
                              quantity: exist.quantity + 1,
                            });
                          } else {
                            addToCart(i);
                          }
                        }}>
                        Add to Cart
                      </button>
                      <button className='btn btn-sm btn-success ml-2'>
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Route>
          </Switch>
        </div>

        <div className='col-lg-4 col-12 fixed-h-100 px-2 scroll-y position-relative pb-5  bg-light d-lg-block d-none'>
          <Cart />
        </div>
      </div>
      <Canva visible={show} />
      <AddAddress visible={showAddAddress} />
      <HiddenCart visible={showHiddenCart} />
    </div>
  );
}
