import { useEffect, useState } from "react";
import "./App.css";
import MainRoute from "./components/routes";
import CartPage from "./components/screens/CartPage/CartPage";
import CheckoutPage from "./components/screens/CheckoutPage/CheckoutPage";
import ProductPage from "./components/screens/ProductPage/ProductPage";
import ProductsPage from "./components/screens/ProductsPage/ProductsPage";
import CartContext from "./store/contexts/cartContext";

function App() {
  const [ready, setReady] = useState(false);
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <div>
      <CartContext.Provider value={{ carts, setCarts }}>
        <MainRoute />
      </CartContext.Provider>
    </div>
  );
}

export default App;
