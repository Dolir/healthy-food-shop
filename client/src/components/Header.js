import React, { Fragment } from "react";
import logo from "../images/logoOrange.png";
import "../styles/header.css";
import "../styles/modal.css";
import Searchbar from "./Searchbar";
import cartIcon from "../images/cart.png";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "./Auth/Logout";
import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import { useSelector } from "react-redux";
function Header() {
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth);
  const authLinks = (
    <div className="auth">
      <NavLink to="/orders" className="navbar-text">
        {auth.isAuthenticated ? "Orders" : ""}
      </NavLink>
      <Logout />
    </div>
  );
  const guestLinks = (
    <div className="auth">
      <LoginModal className="Signin" />
      <RegisterModal className="Signup" />
    </div>
  );

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
          {auth.isAuthenticated ? authLinks : guestLinks}
          <div className="CartPart">
            <NavLink to="/cart">
              <img src={cartIcon} id="cartIcon" alt="cartIcon" />
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
