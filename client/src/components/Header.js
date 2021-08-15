import React from "react";
import logo from "../images/logoOrange.png";
import "../styles/header.css";
import Searchbar from "./Searchbar";
import cartIcon from "../images/cart.png";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  return (
    <div className="header-container">
      <header>
        <div className="logo-navbar">
          <NavLink to="/">
            <div className="logoPart">
              <img src={logo} id="logo" alt="logo" />
            </div>
          </NavLink>
          <nav>
            <NavLink
              to="/shop/page/1"
              className={pathname.startsWith("/shop") ? "active-nav" : ""}
            >
              Shop
            </NavLink>
            <NavLink
              to="/contacts"
              className={pathname.startsWith("/contacts") ? "active-nav" : ""}
            >
              Contacts
            </NavLink>
            <NavLink
              to="/account"
              className={pathname.startsWith("/account") ? "active-nav" : ""}
            >
              Account
            </NavLink>
          </nav>
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
