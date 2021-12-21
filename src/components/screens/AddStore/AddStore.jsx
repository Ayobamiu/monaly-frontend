/** @format */

import {
  faArrowLeft,
  faCamera,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddressV2 } from "../../../assets/js/getAddress";
import {
  addStore,
  getLoggedInUser,
  loadLoggedInUser,
} from "../../../store/authSlice";
import "./css/style.css";

const AddStore = (props) => {
  const dispatch = useDispatch();

  const addStoreStatus = useSelector((state) => state.app.user.addStoreStatus);
  useEffect(() => {
    dispatch(loadLoggedInUser());
  }, [dispatch]);

  const loggedInUser = useSelector(getLoggedInUser);
  if (!loggedInUser) {
    window.location = "/sign-in";
  }
  const [image, setImage] = useState([]);
  const [logo, setLogo] = useState("");

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [country, setcountry] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);

  const getLatandLong = async () => {
    try {
      setLoadingAddress(true);
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          setlatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
        });
      } else {
      }
      const result = await getAddressV2(
        "3b4c10a64fff96eaf6167a0c4c3926d5",
        latitude,
        longitude
      );

      setaddress(result.currentLocation);
      setstate(result.city);
      setcity(result.city);
      setcountry(result.country);

      setLoadingAddress(false);
    } catch (error) {
      setLoadingAddress(false);
    }
  };

  return (
    <div id='addStore' className='container my-5'>
      <div className='my-3 d-flex align-items-center'>
        <div
          className='shadow-small p-3 bg-white rounded-pill back-arrow'
          onClick={() => props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span className='link-large mx-3'>Add Business Information </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData();
          if (logo) {
            data.append("image", logo);
          }
          if (name) {
            data.set("name", name);
          }
          if (description) {
            data.set("description", description);
          }
          if (phone) {
            data.set("phone", phone);
          }
          if (address) {
            data.set("address", address);
          }
          if (city) {
            data.set("city", city);
          }
          if (state) {
            data.set("state", state);
          }
          if (latitude) {
            data.set("latitude", latitude);
          }
          if (longitude) {
            data.set("longitude", longitude);
          }
          if (country) {
            data.set("country", country);
          }

          dispatch(addStore(data));
        }}>
        <label className='text-medium my-2' htmlFor='name'>
          Business Name
        </label>
        <input
          required
          type='text'
          name='name'
          id='name'
          placeholder='Business Name'
          className='form-control form-control-lg'
          onChange={(e) => setName(e.target.value)}
        />

        <label className='text-medium my-2' htmlFor='description'>
          Description
        </label>
        <input
          required
          type='text'
          name='description'
          id='description'
          placeholder='Description'
          className='form-control form-control-lg'
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='phone'>
          Phone
        </label>
        <input
          required
          type='tel'
          name='phone'
          id='phone'
          placeholder='Phone'
          className='form-control form-control-lg'
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='address'>
          Business Address
        </label>
        <input
          required
          type='text'
          name='address'
          id='address'
          defaultValue={address}
          placeholder='Business Address'
          className='form-control form-control-lg'
          onChange={(e) => setaddress(e.target.value)}
        />

        <button
          className='d-flex justify-content-center align-items-center primary-btn custom-btn-sm py-2 primary-btn primary-btn-inverse my-3'
          onClick={(e) => {
            e.preventDefault();
            getLatandLong();
          }}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' size='lg' />
          <span>Use Current location</span>
        </button>
        {loadingAddress && <div className='loader'></div>}

        <label className='text-medium my-2' htmlFor='city'>
          City
        </label>
        <input
          required
          type='text'
          name='city'
          id='city'
          defaultValue={city}
          placeholder='City'
          className='form-control form-control-lg'
          onChange={(e) => setcity(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='state'>
          State
        </label>
        <input
          required
          type='text'
          name='state'
          id='state'
          defaultValue={state}
          placeholder='State'
          className='form-control form-control-lg'
          onChange={(e) => setstate(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='country'>
          Country
        </label>
        <input
          required
          type='text'
          name='country'
          id='country'
          defaultValue={country}
          placeholder='Country'
          className='form-control form-control-lg'
          onChange={(e) => setcountry(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='hiddeninput'>
          Logo
        </label>
        <div
          className='input-images-item text-center link-small '
          style={{ backgroundImage: `url(${image})` }}>
          <input
            type='file'
            class='hiddeninput'
            id='hiddeninput'
            onChange={(e) => {
              e.preventDefault();
              const objectUrl = URL.createObjectURL(e.target.files[0]);
              setImage(objectUrl);
              setLogo(e.target.files[0]);
            }}
            accept='image/*'
          />
          <label for='hiddeninput' className='cursor text-x-small'>
            <FontAwesomeIcon icon={faCamera} size='2x' />
          </label>
        </div>

        <br />
        <input
          type='submit'
          value='Submit'
          className='my-2 primary-btn custom-btn-sm'
        />
      </form>
      <br />
      <div className='text-x-small'>{addStoreStatus}</div>
    </div>
  );
};

export default AddStore;
