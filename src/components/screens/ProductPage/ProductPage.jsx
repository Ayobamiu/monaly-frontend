import React, { useEffect } from "react";
import "./css/style.css";
import BackButton from "../../includes/BackButton/BackButton";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addproductToCart, loadproduct } from "../../../store/productSlice";
import { getLoggedInUser } from "../../../store/authSlice";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.app.products.product);
  const loggedInUser = useSelector(getLoggedInUser);
  useEffect(() => {
    dispatch(loadproduct(props.match.params.productId));
  }, []);

  const signInLocation = `/sign-in?redirect=/product/${props.match.params.productId}`;

  return (
    <div id="productPage">
      
      <BackButton text="Product Details" props={props} />
      <div className="container">
        <div className="row align-items-center my-3 flex-wrap">
          <div className="col-md-8 col-12 ">
            <div
              id="carouselExampleControls"
              class="carousel slide shadow-small"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
                {product.images &&
                  product.images.map((item, index) => (
                    <div class={`carousel-item ${index === 0 && "active"}`}>
                      <div
                        className="product-image bg-white "
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                    </div>
                  ))}
                {product.video && (
                  <div class={`carousel-item`}>
                    <div className="product-image bg-light ">
                      <video width="100%" height="100%" controls>
                        <source src={product.video} type="video/mp4" />
                        <source src={product.video} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
                {product.images && product.images.length === 0 && (
                  <div class="carousel-item active">
                    <div className="product-image bg-white  ">
                      <span className="text-medium">No Image</span>
                    </div>
                  </div>
                )}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <div className="d-flex w-100 justify-content-end"></div>
            <div
              class="modal fade "
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="link-large">{product.title}</div>
            <div className="link-medium text-muted">NGN {product.price}</div>
            <NavLink to={loggedInUser ? "/cart" : signInLocation}>
              <button
                className="primary-btn my-2 hide-900"
                onClick={() =>
                  loggedInUser
                    ? dispatch(addproductToCart(product._id))
                    : (window.location = signInLocation)
                }
              >
                Buy Now
              </button>
            </NavLink>
            <button
              className="primary-btn-inverse my-2 hide-900"
              onClick={() =>
                loggedInUser
                  ? dispatch(addproductToCart(product._id))
                  : (window.location = signInLocation)
              }
            >
              Add to Cart
            </button>
            <h1 className="text-medium"></h1>
          </div>
        </div>

        <div className="row align-items-center my-3 flex-wrap">
          <div className="col-md-8 col-12 ">
            {product.description && (
              <div>
                <h1 className="link-medium">Description</h1>
                <p className="custom-p">{product.description}</p>
              </div>
            )}
            <h1 className="link-medium">Return Policy</h1>
            {product.returnable && (
              <p className="text-small">
                This product is marked as returnable. With this, your payment is
                refundable if you are not satisfied with package delivered to
                you. <br />
                <br />
                <div id="returnPolcy" className="collapse">
                  After recieving the package, go to your orders page and click{" "}
                  <button className="btn btn-outline-dark btn-sm" disabled>
                    Recieved
                  </button>{" "}
                  to indicate the you have Recieved and satisfied with the
                  package delivered.
                  <br />
                  <br /> If you don't mark it as Recieved after 24 hours of
                  delivery, it will be automatically genearated that you are
                  satisfied with the quality of package Recieved
                  <br />
                  <br />
                  When you have issues with authenticity of package Recieved,
                  click the{" "}
                  <button className="btn btn-outline-dark btn-sm" disabled>
                    Reject
                  </button>{" "}
                  button in the order page. And we will proccess your refund
                </div>
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  href="#returnPolcy"
                  role="button"
                  aria-expanded="false"
                  aria-controls="returnPolcy"
                >
                  Read more..
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed-bottom bg-white border-top p-3 container show-900">
        <div className="row g-2">
          <div className="col-6">
            <NavLink to={loggedInUser ? "/cart" : signInLocation}>
              <button
                className="primary-btn my-2 custom-btn-sm"
                onClick={() =>
                  loggedInUser
                    ? dispatch(addproductToCart(product._id))
                    : (window.location = signInLocation)
                }
              >
                Buy Now
              </button>
            </NavLink>
          </div>
          <div className="col-6">
            <button
              className="primary-btn-inverse my-2 custom-btn-sm "
              onClick={() =>
                loggedInUser
                  ? dispatch(addproductToCart(product._id))
                  : (window.location = signInLocation)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
