import React from "react";
import { Link } from "react-router-dom";
function SortPopup({ option, setOption }) {
  function handleDisplay(e) {
    let elementDisplay = document.querySelector(".options-list");
    elementDisplay.style.display =
      elementDisplay.style.display === "none" ? "block" : "none";
  }
  function handleSelect(e) {
    if (e.target.nodeName === "SPAN") {
      setOption(e.target.parentElement.innerText);
      handleDisplay();
      return;
    }
    setOption(e.target.innerText);
    handleDisplay();
  }
  return (
    <div className="sort-popup">
      <div onClick={handleDisplay}>
        <span>{option}</span>
      </div>
      <Link to="/shop/page/1">
        <ul className="options-list" style={{ display: "none" }}>
          <li onClick={handleSelect}>Alphabet</li>
          <li onClick={handleSelect}>
            Price<span className="lowlight">(high to low)</span>
          </li>
          <li onClick={handleSelect}>
            Price<span className="lowlight">(low to high)</span>
          </li>
        </ul>
      </Link>
    </div>
  );
}

export default SortPopup;
