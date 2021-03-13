import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route component={SignIn} path="/sign-in" />
        <Route component={SignUp} path="/sign-up" />
        <Route component={HomePage} path="/" />
      </Switch>
    </Router>
  );
};

export default MainRoute;
