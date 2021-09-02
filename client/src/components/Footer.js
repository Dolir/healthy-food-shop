import React from "react";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-block about">
          <h1>About</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
        </div>
        <div className="footer-block links">
          <h1>Quick Links</h1>
          <ul className="default-ul">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop/page/1">Store</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-block social">
          <h1>Social</h1>
          <ul className="default-ul">
            <li>
              <a href="github.com">GitHub</a>
            </li>
            <li>
              {" "}
              <a href="github.com">Facebook</a>
            </li>
            <li>
              <a href="github.com">Telegram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
