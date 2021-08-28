import React from "react";
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
// import { getCartItemsCount, clearCartCount } from "../features/cart/cartSlice";
function Header() {
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth);
  const cartItemsCount = useSelector((state) => state.cart.cartItems).length;
  const [modal, setModal] = React.useState(false);
  function onClick(e) {
    setModal(!modal);
  }
  const authLinks = (
    <div className="auth">
      <NavLink to="/orders" className="navbar-text" onClick={onClick}>
        {auth.isAuthenticated ? "Orders" : ""}
      </NavLink>
      <Logout onClick={onClick} />
    </div>
  );
  const guestLinks = (
    <div className="auth">
      <LoginModal className="Signin" onClick={onClick} />
      <RegisterModal className="Signup" onClick={onClick} />
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
              <i>{cartItemsCount}</i>
            </NavLink>
          </div>
        </div>
      </header>
      <header className="wrapper">
        {" "}
        <div
          className="header-modal"
          style={
            modal
              ? {
                  pointerEvents: "auto",
                  transform: "translateX(000px)",
                }
              : {
                  pointerEvents: "none",
                  transform: "translateX(-1500px)",
                }
          }
        >
          <ul>
            <li className="exit-btn">
              <button onClick={onClick}>&times;</button>
            </li>
            <li>
              <NavLink
                onClick={onClick}
                to="/shop/page/1"
                className={pathname.startsWith("/shop") ? "active-nav" : ""}
              >
                Shop
              </NavLink>
            </li>

            <li>
              {" "}
              <NavLink
                onClick={onClick}
                to="/contacts"
                className={pathname.startsWith("/contacts") ? "active-nav" : ""}
              >
                Contacts
              </NavLink>
            </li>

            <li>
              {" "}
              <NavLink
                onClick={onClick}
                to="/account"
                className={pathname.startsWith("/account") ? "active-nav" : ""}
              >
                Account
              </NavLink>
            </li>

            <li>{auth.isAuthenticated ? authLinks : guestLinks}</li>
            <li className="CartPart">
              {" "}
              <NavLink to="/cart" onClick={onClick}>
                <img src={cartIcon} id="cartIcon" alt="cartIcon" />
                <i>{cartItemsCount}</i>
              </NavLink>
            </li>
          </ul>
        </div>
        <div class="menu-icon" onClick={onClick}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <Searchbar />
        <div className="logo-navbar">
          <NavLink to="/">
            <div className="logoPart">
              <img src={logo} id="logo" alt="logo" />
            </div>
          </NavLink>
        </div>{" "}
      </header>
    </div>
  );
}

export default Header;
