import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    carts: [],
    orders: [],
    // stores: [],
    order: {},
    store: { logo: "", products: [] },
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
    storePhoneOne: "",
    storePhoneTwo: "",
    transactionStatus: "",
    cartLoadStatus: "",
    status: "",
    loadingStoreLogo: false,
    transactionloading: false,
    orderLoading: false,
    sandBoxLoading: false,
    loadingStore: false,
    sandBox: {},
  },
  reducers: {
    storeUpdateStart: (products, action) => {
      products.loadingStore = true;
    },
    storeUpdated: (products, action) => {
      products.store = {
        ...action.payload,
        products: current(products.store.products),
      };
      products.loadingStore = false;
    },
    storeUpdateFailed: (products, action) => {
      products.loadingStore = false;
    },

    storeLogoUpdateStart: (products, action) => {
      products.loadingStoreLogo = true;
    },
    storeLogoUpdated: (products, action) => {
      products.store.logo = action.payload.logo;
      products.loadingStoreLogo = false;
    },
    storeLogoUpdateFailed: (products, action) => {
      products.loadingStoreLogo = false;
    },
    getsandBoxStart: (products, action) => {
      products.sandBoxLoading = true;
    },
    gotsandBox: (products, action) => {
      products.sandBox = action.payload;
      products.sandBoxLoading = false;
    },
    gettingsandBoxFailed: (products, action) => {
      products.sandBoxLoading = false;
    },
    orderPlaceStart: (products, action) => {
      products.orderLoading = true;
    },
    orderPlaced: (products, action) => {
      products.carts = [];
      products.orderLoading = false;
      window.location.replace("/pay-redirect");
    },
    orderPlaceFailed: (products, action) => {
      products.orderLoading = false;
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
      products.cartLoadStatus = "";
    },
    cartsReceived: (products, action) => {
      products.carts = action.payload.carts;
      products.storeAddress = action.payload.storeAddress;
      products.loadingCarts = false;
      products.cartLoadStatus = "";
    },
    cartsRequestFailed: (products, action) => {
      products.loadingCarts = false;
      products.cartLoadStatus = "Could not Load your Cart";
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
      products.store = action.payload;
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
      products.store.products.push(action.payload);
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
    transactionAddStart: (products, action) => {
      products.transactionStatus = "Adding transaction";
      products.transactionloading = true;
    },
    transactionAdded: (products, action) => {
      products.transactionStatus = "Transaction Added successfully";
      products.transactionloading = false;
    },
    transactionAddFailed: (products, action) => {
      // products.loading = false;
      products.transactionStatus = "Transaction Failed";
      products.transactionloading = false;
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
  storeUpdated,
  storeUpdateStart,
  storeUpdateFailed,
  storeLogoUpdated,
  storeLogoUpdateStart,
  storeLogoUpdateFailed,
  transactionAddFailed,
  transactionAddStart,
  transactionAdded,
  orderPlaceStart,
  orderPlaceFailed,
  getsandBoxStart,
  gettingsandBoxFailed,
  gotsandBox,
} = slice.actions;

export default slice.reducer;

//Action creators

export const loadSandBox = (data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `products/load-sandBox`,
      method: "post",
      data,
      onStart: getsandBoxStart.type,
      onSuccess: gotsandBox.type,
      onError: gettingsandBoxFailed.type,
    })
  );
};
export const updateStore = (storeId, data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `products/store/${storeId}`,
      method: "patch",
      data,
      onStart: storeUpdateStart.type,
      onSuccess: storeUpdated.type,
      onError: storeUpdateFailed.type,
    })
  );
};
export const updateStoreLogo = (storeId, data) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `products/store/${storeId}/logo`,
      method: "patch",
      data,
      onStart: storeLogoUpdateStart.type,
      onSuccess: storeLogoUpdated.type,
      onError: storeLogoUpdateFailed.type,
    })
  );
};
export const loadStore = (slug) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/store-by-slug/${slug}`,
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};
export const loadStoreById = (id) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/products/store-by-id/${id}`,
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
export const addTransaction = (data) =>
  apiCallBegan({
    url: "/products/add-transaction",
    method: "post",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    data,
    onStart: transactionAddStart.type,
    onSuccess: transactionAdded.type,
    onError: transactionAddFailed.type,
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
  deliveryMerchant,
  dileveryAddress,
  shippingData
) =>
  apiCallBegan({
    url: "/products/order",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
    method: "post",
    data: {
      products,
      total,
      shippingFee,
      deliveryMethod,
      deliveryMerchant,
      dileveryAddress,
      shippingData,
    },
    onStart: orderPlaceStart.type,
    onSuccess: orderPlaced.type,
    onError: orderPlaceFailed.type,
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
