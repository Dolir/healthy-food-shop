import React from "react";
import logo from "../images/logoOrange.png";
import "../styles/header.css";
import Searchbar from "./Searchbar";
function Header() {
  return (
    <div>
      <header>
        <div>
          <img src={logo} id="logo" />
        </div>
        <Searchbar className="searchBar" />
        <div className="rightSide">
          <div className="auth">
            <h3>register</h3>
            <h3>login</h3>
          </div>
          <div>cart</div>
        </div>
      </header>
    </div>
  );
}

export default Header;
