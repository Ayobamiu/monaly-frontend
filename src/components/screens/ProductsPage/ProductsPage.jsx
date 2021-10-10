import {
  faCheckCircle,
  faCog,
  faImage,
  faPen,
  faPlus,
  faStoreAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadLoggedInUser, updateUserProfile } from "../../../store/authSlice";
import {
  loadStore,
  removeproduct,
  updateStore,
  updateStoreLogo,
} from "../../../store/productSlice";
import "./css/style.css";
import { copyToClipboard, siteUrl } from "../../../assets/js/controls";
import { Helmet } from "react-helmet";
import Verified from "../../../assets/images/Verified.svg";

const ProductsPage = (props) => {
  const loading = useSelector((state) => state.app.products.loading);
  const store = useSelector((state) => state.app.products.store);

  const loadingStoreLogo = useSelector(
    (state) => state.app.products.loadingStoreLogo
  );
  const status = useSelector((state) => state.app.user.status);
  const profile = useSelector((state) => state.app.user.profile);

  const [newStorePhoneTwo, setNewStorePhoneTwo] = useState("");
  const [newStorePhoneOne, setNewStorePhoneOne] = useState("");
  const [newStoreLogo, setNewStoreLogo] = useState("");
  const [newStoreAddress, setNewStoreAddress] = useState("");
  const [newStoreName, setNewStoreName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedProductLink, setCopiedProductLink] = useState(false);
  const dispatch = useDispatch();
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const onCopyProductLink = () => {
    setCopiedProductLink(true);
    setTimeout(() => {
      setCopiedProductLink(false);
    }, 1000);
  };
  useEffect(() => {
    dispatch(loadStore(props.match.params.slug));
    dispatch(loadLoggedInUser());
  }, []);

  const titles = [];
  store.products &&
    store.products.forEach((product) => {
      titles.push(`${product.title}`);
    });
  console.log("titles", titles.join(","));
  console.log("props", props);

  const CopyProductLink = ({ link }) => {
    return (
      <div
        className="copy-product-link shadow-small p-3 bg-white rounded-pill back-arrow"
        onClick={(e) => {
          onCopyProductLink();
          copyToClipboard(e, link);
        }}
      >
        <FontAwesomeIcon icon={faCopy} className="text-secondary" size="lg" />
      </div>
    );
  };
  return (
    <div id="productsPage">
      {loading && store.products && store.products.length === 0 && (
        <div className="loader-full">
          <div className="loader"></div>
        </div>
      )}
      {/* HEaders */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content={store.name} />
        <meta
          name="description"
          content={`${store.name} - ${store.description} - ${titles.join(
            ","
          )} `}
        />
        <meta property="og:title" content={`@${store.name} - Monaly`} />
        <meta
          property="og:description"
          content={`${store.name} - ${store.description} - ${titles.join(
            ","
          )} `}
        />
        {store.logo && <meta property="og:image" content={store.logo} />}
        <meta name="twitter:site" content={`@${store.name} - Monaly`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={`@${store.name} - Monaly`} />

        <title>@{store.name ? store.name : ""} | Monaly</title>
        <link
          rel="canonical"
          href={`${siteUrl}store/${props.match.params.slug}`}
        />
      </Helmet>
      {/* HEaders */}

      {/* Copy Link to ClipBoard */}

      {store.user === profile._id && (
        <div
          class="cursor alert alert-success link-small d-flex justify-content-between align-items-center copy-link-text position-fixed bottom-0"
          role="alert"
          onClick={(e) => {
            onCopy();
            copyToClipboard(e, `${siteUrl}store/${props.match.params.slug}`);
          }}
        >
          <span className="mx-3">
            {copied ? "LInk Copied" : "Copy store Link"}
          </span>
          {copied ? (
            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faCopy} size="lg" />
          )}
        </div>
      )}
      {/* Copy Link to ClipBoard */}

      <div className="container-fluid">
        <div className="d-flex align-items-center my-4 ">
          <div
            className="avatar bg-light position-relative"
            style={{ backgroundImage: `url(${store.logo})` }}
          >
            {loadingStoreLogo && (
              <div className="loader position-absolute top-50 transform-x-50"></div>
            )}
            {store.user === profile._id && (
              <div className="update-store-logo p-1 rounded-pill bg-white border ">
                <input
                  type="file"
                  class="hiddeninput"
                  id="hiddeninput"
                  accept="image/*"
                  onChange={(e) => {
                    const data = new FormData();
                    data.append("image", e.target.files[0]);
                    dispatch(updateStoreLogo(store._id, data));
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
            {!store.logo && (
              <FontAwesomeIcon
                icon={faStoreAlt}
                size="lg"
                className="text-secondary"
              />
            )}
          </div>
          <div className="mx-2">
            <span className="text-large">
              {store.name || props.match.params.userName + "'s Store"}
            </span>
            <div className="text-x-small">
              <img src={Verified} alt="Verified" height="20px" /> Verified
              seller
            </div>
          </div>

          {store.user === profile._id && (
            <div className="ms-auto d-flex align-items-center">
              <FontAwesomeIcon
                icon={faCog}
                className="text-secondary mr-2"
                size="lg"
                title="Store Settings"
                data-bs-toggle="modal"
                data-bs-target="#storeSettings"
              />
              <NavLink to="/add-product">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-secondary ml-2"
                  title="Add Product"
                  size="lg"
                />
              </NavLink>
            </div>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-center my-5 flex-wrap">
          {!loading && store.products && store.products.length === 0 && (
            <div className="border p-5 rounded w-100 text-center my-5">
              <span className="text-medium">
                {store.name || props.match.params.userName} has no products in
                store
              </span>
            </div>
          )}

          {store.products &&
            store.products.map((product, index) => (
              <div
                className="product-item bg-white m-2 p-1 shadow-small"
                key={index}
              >
                <div
                  className="product-item-image bg-white"
                  style={{
                    backgroundImage: `url(${
                      product.images &&
                      product.images.length > 0 &&
                      product.images[0].image
                    })`,
                  }}
                >
                  {profile._id === product.user && (
                    <CopyProductLink link={`product/${product._id}`} />
                  )}

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
                    <div className="text-small ">{product.title}</div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-12">
          {/* <div className="col-md-3 col-12">
            <div className="product-item bg-white m-2 p-1 shadow-small"></div>
          </div> */}
        </div>
      </div>

      <div
        class="modal fade"
        id="storeSettings"
        tabindex="-1"
        aria-labelledby="storeSettingsLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {};

                if (newStoreName) {
                  data.name = newStoreName;
                }
                if (newStoreAddress) {
                  data.address = newStoreAddress;
                }
                if (newStorePhoneOne) {
                  data.phoneOne = newStorePhoneOne;
                }
                if (newStorePhoneTwo) {
                  data.phoneTwo = newStorePhoneTwo;
                }

                console.log("data", data);
                dispatch(updateStore(store._id, data));
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalLabel">
                  Store Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label htmlFor="storeLogo" className="text-small">
                  Store Logo
                </label>
                <div className="d-flex align-items-center my-3">
                  <div
                    className="avatar mx-3 bg-light position-relative"
                    style={{ backgroundImage: `url(${store.logo})` }}
                  >
                    {!store.logo && (
                      <FontAwesomeIcon
                        icon={faStoreAlt}
                        size="lg"
                        className="text-secondary"
                      />
                    )}
                    {loadingStoreLogo && (
                      <div className="loader position-absolute top-50 transform-x-50"></div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="storeLogo"
                    id="storeLogo"
                    // required={deliveryMethod === "toDoor"}
                    onChange={(e) => {
                      setNewStoreLogo(e.target.files[0]);
                      const data = new FormData();
                      data.append("image", e.target.files[0]);
                      dispatch(updateStoreLogo(store._id, data));
                    }}
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="storeName" className="text-small">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    id="storeName"
                    className="form-control text-small "
                    defaultValue={store.name}
                    // required={deliveryMethod === "toDoor"}
                    onChange={(e) => setNewStoreName(e.target.value)}
                  />{" "}
                </div>

                <div className="my-3">
                  <label htmlFor="storeAddress" className="text-small">
                    Store Address
                  </label>

                  <input
                    type="text"
                    name="storeAddress"
                    placeholder="Store Address"
                    id="storeAddress"
                    className="form-control text-small"
                    defaultValue={store.address}
                    // required={deliveryMethod === "toDoor"}
                    onChange={(e) => setNewStoreAddress(e.target.value)}
                  />
                  <small className="d-block text-x-small text-success">
                    Orders from your store will be picked up at this Address
                  </small>
                </div>
                <div className="my-3">
                  <label htmlFor="storePhone" className="text-small">
                    Store Phone One
                  </label>
                  <input
                    type="tel"
                    name="storePhone"
                    id="storePhone"
                    className="form-control text-small"
                    placeholder="Store Phone"
                    defaultValue={store.phoneOne}
                    // required={deliveryMethod === "toDoor"}
                    onChange={(e) => setNewStorePhoneOne(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="storePhoneTwo" className="text-small">
                    Store Phone Two
                  </label>
                  <input
                    type="tel"
                    name="storePhoneTwo"
                    id="storePhoneTwo"
                    className="form-control text-small "
                    placeholder="Store Phone 2"
                    defaultValue={store.phoneTwo}
                    // required={deliveryMethod === "toDoor"}
                    onChange={(e) => setNewStorePhoneTwo(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <span
                  className="text-x-small"
                  style={{ color: status && status.color }}
                >
                  {status && status.message}
                </span>
                {/* <span className="text-x-small me-auto">{addAddressStatus}</span> */}
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
                  // disabled={gettingLatLong}
                >
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {copiedProductLink && (
        <div className=" w-100 position-fixed bottom-0 text-center text-medium">
          Link Copied
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
