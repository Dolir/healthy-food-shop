import React from "react";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Shop from "./components/ShopPage/Shop";
import SingleItem from "./components/ShopPage/SingleItem";
import Contacts from "./components/Contacts";

import { loadUser } from "./features/auth/authSlice";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/search/:searchTerm/page/:page/">
            <Shop />
          </Route>
          <Route path="/shop/page/:page">
            <Shop />
          </Route>

          <Route path="/shop/id/:id">
            <SingleItem />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
