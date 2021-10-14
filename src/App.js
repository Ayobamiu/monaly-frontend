import { useEffect, useState } from "react";
import "./App.css";
import MainRoute from "./components/routes";
import CartPage from "./components/screens/CartPage/CartPage";
import CheckoutPage from "./components/screens/CheckoutPage/CheckoutPage";
import ProductPage from "./components/screens/ProductPage/ProductPage";
import ProductsPage from "./components/screens/ProductsPage/ProductsPage";

function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <div>
      <MainRoute />
    </div>
  );
}

export default App;
