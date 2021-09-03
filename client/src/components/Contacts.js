import React from "react";
import "../styles/contacts.css";
function Contacts() {
  React.useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
  }, []);
  return (
    <div className="contacts-container">
      <h1>Contacts</h1>
      <ul>
        <li>
          <h2>Email: example@robot.com</h2>
        </li>
        <li>
          <h2>Phone: +1551 1500 1500</h2>
        </li>
      </ul>
    </div>
  );
}

export default Contacts;
