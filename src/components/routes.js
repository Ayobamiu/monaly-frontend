import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import StartResetPassword from "./screens/StartResetPassword/StartResetPassword";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import DashBoard from "./screens/DashBoard/DashBoard";
import VisitorsScreen from "./screens/VisitorsScreen/VisitorsScreen";
import Admin from "./screens/Admin/Admin";
import Pay from "./screens/Pay/Pay";
import ProductsPage from "./screens/ProductsPage/ProductsPage";
import ProductPage from "./screens/ProductPage/ProductPage";
import CartPage from "./screens/CartPage/CartPage";
import CheckoutPage from "./screens/CheckoutPage/CheckoutPage";
import OrdersPage from "./screens/OrdersPage/OrdersPage";
import TrackSingleOrder from "./includes/TrackSingleOrder/TrackSingleOrder";
import AddProduct from "./screens/AddProduct/AddProduct";
import AddStore from "./screens/AddStore/AddStore";
import WithdrawalPage from "./screens/WithdrawalPage/WithdrawalPage";
import Money from "./screens/Money/Money";
import Stores from "./screens/Stores/Stores";
import PayRedirect from "./screens/PayRedirect/PayRedirect";
import CheckoutComplete from "./screens/CheckoutComplete/CheckoutComplete";

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route component={StartResetPassword} path="/start-reset-password" />
        <Route component={ResetPassword} path="/reset-password/:token" />
        <Route component={SignIn} path="/sign-in" />
        <Route component={SignUp} path="/sign-up" />
        <Route component={DashBoard} path="/dashboard" />
        <Route component={CheckoutComplete} path="/pay-success" />
        <Route component={Pay} path="/pay" />
        <Route component={Admin} path="/admin" />
        <Route component={TrackSingleOrder} path="/orders/:orderId" />
        <Route component={AddProduct} path="/add-product" />
        <Route component={PayRedirect} path="/pay-redirect" />
        <Route component={Stores} path="/stores" />
        <Route component={WithdrawalPage} path="/withdraw" />
        <Route component={Money} path="/money" />
        <Route component={AddStore} path="/add-store" />
        <Route component={OrdersPage} path="/orders" />
        <Route component={CheckoutPage} path="/checkout" />
        <Route component={CartPage} path="/cart" />
        <Route component={ProductPage} path="/product/:productId" />
        <Route component={ProductsPage} path="/store/:slug" />
        <Route component={VisitorsScreen} path="/:userName" />
        <Route component={HomePage} path="/" />
      </Switch>
    </Router>
  );
};

export default MainRoute;
// https://monaly-app.herokuapp.com/terms-of-service
// https://monaly-app.herokuapp.com/privacy-policy
