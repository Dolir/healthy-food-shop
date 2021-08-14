import React from "react";

function SortPopup() {
  const [option, setOption] = React.useState("Alphabet");
  function handleDisplay(e) {
    const elementDisplay = document.querySelector(".options-list");
    // if (elementDisplay === "none") {
    //   elementDisplay = "block";
    // } else {
    //   elementDisplay = "none";
    // }
    document.querySelector(".options-list").style.display =
      elementDisplay.style.display === "none" ? "block" : "none";
  }
  function handleSelect(e) {
    setOption(e.target.innerText);
    handleDisplay();
  }
  return (
    <div>
      <input type="button" value={option} onClick={handleDisplay} />
      <ul className="options-list">
        <li onClick={handleSelect}>Alphabet</li>
        <li onClick={handleSelect}>Price(high to low)</li>
        <li onClick={handleSelect}>Price(low to high)</li>
      </ul>
    </div>
  );
}

export default SortPopup;
