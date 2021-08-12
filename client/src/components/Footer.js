import React from "react";
import "../styles/footer.css";
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
            <li>Store</li>
            <li>Contacts</li>
            <li>Account</li>
          </ul>
        </div>
        <div className="footer-block social">
          <h1>Social</h1>
          <ul className="default-ul">
            <li>GitHub</li>
            <li>Facebook</li>
            <li>Discord</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
