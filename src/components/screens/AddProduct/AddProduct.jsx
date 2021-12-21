/** @format */

import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, loadLoggedInUser } from "../../../store/authSlice";
import { addproduct } from "../../../store/productSlice";
import "./css/style.css";

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.app.user.profile);
  const status = useSelector((state) => state.app.products.status);
  useEffect(() => {
    dispatch(loadLoggedInUser());
  }, [dispatch]);

  const loggedInUser = useSelector(getLoggedInUser);
  if (!loggedInUser) {
    window.location = "/sign-in";
  }
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(1);
  const [returnable, setReturnable] = useState(true);
  const [video, setVideo] = useState("");
  const [store, setStore] = useState("");
  return (
    <div id='addProduct' className='container my-5'>
      <div className='my-3 d-flex align-items-center'>
        <div
          className='shadow-small p-3 bg-white rounded-pill back-arrow'
          onClick={() => props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span className='link-large mx-3'>Add Product </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData();
          if (images.length > 0) {
            for (let index = 0; index < imagesToUpload.length; index++) {
              const image = imagesToUpload[index];

              data.append("images", image);
            }
          }
          if (title) {
            data.set("title", title);
          }
          if (description) {
            data.set("description", description);
          }
          if (video) {
            data.append("video", video);
          }
          if (price) {
            data.set("price", price);
          }
          if (numberInStock) {
            data.set("numberInStock", numberInStock);
          }
          if (returnable) {
            data.set("returnable", returnable);
          }
          if (store) {
            data.set("store", store);
          }

          dispatch(addproduct(data));
        }}>
        <label className='text-medium my-2' htmlFor='title'>
          Select Store
        </label>
        <select
          name='store'
          id='store'
          onChange={(e) => setStore(e.target.value)}
          className='form-control form-control-lg'
          required>
          <option unselectable>Select Store</option>
          {profile.stores &&
            profile.stores.map((store, index) => (
              <option value={store._id} key={index}>
                {store.name}
              </option>
            ))}
        </select>

        <label className='text-medium my-2' htmlFor='title'>
          Title Of the product
        </label>
        <input
          required
          type='text'
          name='title'
          id='title'
          placeholder='Title Of the product'
          className='form-control form-control-lg'
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='description'>
          Description Of the product
        </label>
        <input
          required
          type='text'
          name='description'
          id='description'
          placeholder='Description Of the product'
          className='form-control form-control-lg'
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='price'>
          Price
        </label>
        <input
          required
          type='number'
          name='price'
          id='price'
          placeholder='0.00'
          className='form-control form-control-lg'
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='numberInStock'>
          Number in stock
        </label>
        <input
          required
          type='number'
          name='numberInStock'
          id='numberInStock'
          defaultValue={1}
          className='form-control form-control-lg'
          onChange={(e) => setNumberInStock(e.target.value)}
        />
        <label className='text-medium my-2' htmlFor='hiddeninput'>
          Product Images
        </label>
        <div className='input-images action-card'>
          <div className='input-images-item text-center link-small '>
            <input
              type='file'
              class='hiddeninput'
              id='hiddeninput'
              onChange={(e) => {
                e.preventDefault();
                const objectUrl = URL.createObjectURL(e.target.files[0]);
                setImages([objectUrl, ...images]);
                setImagesToUpload([e.target.files[0], ...imagesToUpload]);
              }}
              accept='image/*'
            />
            <label for='hiddeninput' className='cursor text-x-small'>
              Add Image
            </label>
          </div>
          {images.map((item, index) => (
            <div
              className='input-images-item'
              style={{ backgroundImage: `url(${item})` }}
              key={index}>
              <div className='input-images-item-delete cursor'>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => {
                    const targetImage = images[index];
                    const targetImage2 = imagesToUpload[index];
                    const newImages = images.filter(
                      (image) => image !== targetImage
                    );
                    const newImagesToUpload = imagesToUpload.filter(
                      (image) => image !== targetImage2
                    );
                    setImages(newImages);
                    setImagesToUpload(newImagesToUpload);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <label className='text-medium my-2 mr-2' htmlFor='video'>
          Attach Video
        </label>
        <br />
        <input
          className='text-medium mb-2'
          type='file'
          name='video'
          id='video'
          onChange={(e) => setVideo(e.target.files[0])}
          accept='video/*'
        />
        <br />
        <label className='text-medium my-2 mr-2' htmlFor='returnable'>
          Is this product returnable?
        </label>
        <input
          required
          type='checkbox'
          name='returnable'
          id='returnable'
          defaultChecked
          onChange={(e) => setReturnable(e.target.checked)}
        />
        <br />
        <input
          type='submit'
          value='Submit'
          className='my-2 primary-btn custom-btn-sm'
        />
      </form>
      <br />
      <div className='text-x-small'>{status}</div>
    </div>
  );
};

export default AddProduct;
