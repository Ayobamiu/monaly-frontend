import {
  faImage,
  faImages,
  faPen,
  faStore,
  faStoreAlt,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadLoggedInUser } from "../../../store/authSlice";
import {
  loadproducts,
  removeproduct,
  updateStoreLogo,
} from "../../../store/productSlice";
import "./css/style.css";

const ProductsPage = (props) => {
  const products = useSelector((state) => state.app.products.list);
  console.log("products", products);
  const storeLogo = useSelector((state) => state.app.products.storeLogo);
  const storeOwner = useSelector((state) => state.app.products.storeOwner);
  const storeName = useSelector((state) => state.app.products.storeName);
  const profile = useSelector((state) => state.app.user.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadproducts(props.match.params.userName));
    dispatch(loadLoggedInUser());
  }, []);

  return (
    <div id="productsPage">
      <div className="container">
        <div className="d-flex align-items-center my-4 ">
          <div
            className="avatar bg-light position-relative"
            style={{ backgroundImage: `url(${storeLogo})` }}
          >
            {storeOwner === profile._id && (
              <div className="update-store-logo p-1 rounded-pill bg-white border">
                <input
                  type="file"
                  class="hiddeninput"
                  id="hiddeninput"
                  accept="image/*"
                  onChange={(e) => {
                    const data = new FormData();
                    data.append("image", e.target.files[0]);
                    dispatch(updateStoreLogo(data));
                  }}
                />
                <label for="hiddeninput" className="cursor mb-0">
                  <FontAwesomeIcon
                    icon={faPen}
                    size="sm"
                    className="text-secondary  "
                  />
                </label>
              </div>
            )}
            {!storeLogo && (
              <FontAwesomeIcon
                icon={faStoreAlt}
                size="lg"
                className="text-secondary"
              />
            )}
          </div>
          <div className="mx-2">
            <span className="text-large">
              {storeName || props.match.params.userName + "'s Store"}
            </span>
            <div className="text-x-small">Verified</div>
          </div>
          {storeOwner === profile._id && (
            <NavLink to="/add-product" className="ms-auto">
              <button className="ms-auto primary-btn custom-btn-xsm primary-inverse-btn">
                Add Product
              </button>
            </NavLink>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center my-5 flex-wrap">
          {products.length === 0 && (
            <div className="border p-5 rounded w-100 text-center my-5">
              <span className="text-medium">
                {storeName || props.match.params.userName} has no products in
                store
              </span>
            </div>
          )}
          {products.map((product, index) => (
            <div
              className="product-item bg-white m-2 p-1 shadow-small"
              key={index}
            >
              <div
                className="product-item-image bg-light"
                style={{
                  backgroundImage: `url(${
                    product.images &&
                    product.images.length > 0 &&
                    product.images[0].image
                  })`,
                }}
              >
                {profile._id === product.user && (
                  <div className="delete-product">
                    <div
                      className="shadow-small p-3 bg-white rounded-pill back-arrow"
                      onClick={() => dispatch(removeproduct(product._id))}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-secondary"
                      />
                    </div>
                  </div>
                )}
                {product.images && product.images.length === 0 && (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-secondary"
                    size="lg"
                  />
                )}
                <small className="product-condition badge bg-primary text-white">
                  {product.returnable && "Returnable"}
                </small>
              </div>

              <NavLink to={`/product/${product._id}`} className="border">
                <div className="p-3 ">
                  <div className="link-large ">NGN {product.price}</div>
                  <div className="text-large ">{product.title}</div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
