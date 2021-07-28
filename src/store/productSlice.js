import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    carts: [],
    orders: [],
    order: {},
    product: { images: [] },
    dispatchCompanies: [],
    loadingDispatchCompanies: false,
    carting: false,
    loadingCarts: false,
    loadingOrders: false,
    storeOwner: "",
    storeName: "",
    storeLogo: "",
    shippingFee: 0,
    storeAddress: "",
    status: "",
  },
  reducers: {
    storeLogoUpdated: (products, action) => {
      products.storeLogo = action.payload.storeLogo;
    },
    orderPlaced: (products, action) => {
      products.carts = [];
      // window.location = "/cart";
    },
    dispatchCompaniesRequested: (products, action) => {
      products.loadingDispatchCompanies = true;
    },
    dispatchCompaniesReceived: (products, action) => {
      products.dispatchCompanies = action.payload;
      products.loadingDispatchCompanies = false;
    },
    dispatchCompaniesRequestFailed: (products, action) => {
      products.loadingDispatchCompanies = false;
    },
    ordersRequested: (products, action) => {
      products.loadingOrders = true;
    },
    ordersReceived: (products, action) => {
      products.orders = action.payload;
      products.loadingOrders = false;
    },
    ordersRequestFailed: (products, action) => {
      products.loadingOrders = false;
    },
    orderRequested: (products, action) => {
      products.loading = true;
    },
    orderReceived: (products, action) => {
      products.order = action.payload;
      products.loading = false;
    },
    orderRequestFailed: (products, action) => {
      products.loading = false;
    },
    cartsRequested: (products, action) => {
      products.loadingCarts = true;
    },
    cartsReceived: (products, action) => {
      products.carts = action.payload.carts;
      products.storeAddress = action.payload.storeAddress;
      products.loadingCarts = false;
    },
    cartsRequestFailed: (products, action) => {
      products.loadingCarts = false;
    },
    cartUpdateStart: (products, action) => {
      products.carting = true;
    },
    cartUpdated: (products, action) => {
      const targertedCart = products.carts.find(
        (cart) => cart._id === action.payload._id
      );
      targertedCart.quantity = action.payload.quantity;
      products.carting = false;
    },
    cartUpdateFailed: (products, action) => {
      products.carting = false;
    },
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsReceived: (products, action) => {
      products.list = action.payload.products;
      products.storeName = action.payload.storeName || action.payload.firstName;
      products.storeOwner = action.payload._id;
      products.storeLogo =
        action.payload.profilePhoto || action.payload.storeLogo;
      products.loading = false;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
    },
    productRequested: (products, action) => {
      products.loading = true;
    },
    productReceived: (products, action) => {
      products.product = action.payload;
      products.loading = false;
    },
    productRequestFailed: (products, action) => {
      products.loading = false;
    },
    productAddStart: (products, action) => {
      products.loading = true;
      products.status = "loading..";
    },
    productAdded: (products, action) => {
      products.list.push(action.payload);
      products.loading = false;
      products.status = "Added successfully";
    },
    productAddFailed: (products, action) => {
      products.loading = false;
      products.status = "Failed";
    },
    productRemoved: (products, action) => {
      products.list.pop((product) => product._id !== action.payload._id);
    },
    cartAddStart: (products, action) => {
      products.loading = true;
      products.status = "loading";
    },
    cartAdded: (products, action) => {
      products.carts = action.payload.carts;
      products.loading = false;
      products.status = "Added successfully";
    },
    cartAddFailed: (products, action) => {
      products.loading = false;
      products.status = "Failed";
    },
    cartRemoved: (products, action) => {
      products.carts.pop((cart) => cart.product._id !== action.payload.product);
    },
  },
});

export const {
  productAdded,
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productRequested,
  productReceived,
  productRequestFailed,
  productAddStart,
  productAddFailed,
  productRemoved,
  dispatchCompaniesReceived,
  dispatchCompaniesRequestFailed,
  dispatchCompaniesRequested,
  cartAddFailed,
  cartAddStart,
  cartAdded,
  cartRemoved,
  cartsReceived,
  cartsRequestFailed,
  cartsRequested,
  cartUpdateFailed,
  cartUpdated,
  cartUpdateStart,
  orderPlaced,
  ordersReceived,
  ordersRequestFailed,
  ordersRequested,
  orderReceived,
  orderRequestFailed,
  orderRequested,
  storeLogoUpdated,
} = slice.actions;

export default slice.reducer;

//Action creators
export const updateStoreLogo = (data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/auth/me/storelogo`,
      method: "patch",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      data,
      onSuccess: storeLogoUpdated.type,
    })
  );
};
export const loadproducts = (userName) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/users/${userName}/store`,
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};
export const loadCarts = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/carts`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      onStart: cartsRequested.type,
      onSuccess: cartsReceived.type,
      onError: cartsRequestFailed.type,
    })
  );
};
export const loadOrders = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/orders`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      onStart: ordersRequested.type,
      onSuccess: ordersReceived.type,
      onError: ordersRequestFailed.type,
    })
  );
};
export const loadOrder = (orderId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/orders/${orderId}`,
      onStart: orderRequested.type,
      onSuccess: orderReceived.type,
      onError: orderRequestFailed.type,
    })
  );
};
export const updateOrder = (orderId, data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/${orderId}/update-order`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      method: "patch",
      data,
      onStart: orderRequested.type,
      onSuccess: orderReceived.type,
      onError: orderRequestFailed.type,
    })
  );
};
export const loaddispatchCompanies = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/products",
      // params: params,
      onStart: dispatchCompaniesRequested.type,
      onSuccess: dispatchCompaniesReceived.type,
      onError: dispatchCompaniesRequestFailed.type,
    })
  );
};

export const loadproduct = (productId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/${productId}`,
      // params: params,
      onStart: productRequested.type,
      onSuccess: productReceived.type,
      onError: productRequestFailed.type,
    })
  );
};

export const addproductToCart = (productId) =>
  apiCallBegan({
    url: "/products/" + productId + "/add-cart",
    method: "post",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onStart: cartAddStart.type,
    onSuccess: cartAdded.type,
    onError: cartAddFailed.type,
  });

export const removeproductFromCart = (cartId) =>
  apiCallBegan({
    url: "/products/" + cartId + "/remove-cart",
    method: "post",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: cartRemoved.type,
  });
export const updateProductInCart = (cartId, quantity) =>
  apiCallBegan({
    url: "/products/" + cartId + "/update-cart",
    method: "patch",
    data: { quantity },
    onStart: cartUpdateStart.type,
    onSuccess: cartUpdated.type,
    onError: cartUpdateFailed.type,
  });

export const placeOrder = (
  products,
  total,
  shippingFee,
  deliveryMethod,
  deliveryMerchant
) =>
  apiCallBegan({
    url: "/products/order",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    method: "post",
    data: { products, total, shippingFee, deliveryMethod, deliveryMerchant },
    onSuccess: orderPlaced.type,
  });
export const addproduct = (product) =>
  apiCallBegan({
    url: "/products/add",
    method: "post",
    data: product,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
      "content-type": "multipart/form-data",
    },
    onStart: productAddStart.type,
    onSuccess: productAdded.type,
    onError: productAddFailed.type,
  });

export const removeproduct = (productId) =>
  apiCallBegan({
    url: "/products/" + productId + "/remove",
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    onSuccess: productRemoved.type,
  });

export const products = (state) => state.app.products.list;
export const product = (state) => state.app.products.product;
export const loadingproduct = (state) => state.app.products.loading;
