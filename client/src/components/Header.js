import React from "react";
import logo from "../images/logoOrange.png";
import "../styles/header.css";
import Searchbar from "./Searchbar";
import cartIcon from "../images/cart.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <header>
        <div className="logoPart">
          <img src={logo} id="logo" alt="logo" />
          <NavLink to="/">
            <h3>Health</h3>
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/contacts">contacts</NavLink>
          <NavLink to="/account">account</NavLink>
        </div>
        <Searchbar />
        <div className="rightSide">
          <div className="auth">
            <a className="Signup">Sign up</a>
            <a className="Signin">Sign in</a>
          </div>
          <div className="CartPart">
            <img src={cartIcon} id="cartIcon" alt="cartIcon" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
