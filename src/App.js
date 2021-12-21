/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import MainRoute from "./components/routes";
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
