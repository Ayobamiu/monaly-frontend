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

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route component={StartResetPassword} path="/start-reset-password" />
        <Route component={ResetPassword} path="/reset-password/:token" />
        <Route component={SignIn} path="/sign-in" />
        <Route component={SignUp} path="/sign-up" />
        <Route component={DashBoard} path="/dashboard" />
        <Route component={HomePage} path="/" />
      </Switch>
    </Router>
  );
};

export default MainRoute;
// https://monaly-app.herokuapp.com/terms-of-service
// https://monaly-app.herokuapp.com/privacy-policy
