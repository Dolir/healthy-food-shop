import React from "react";
import fruits from "../../images/fruits.jpg";
import "../../styles/home.css";
import ItemsList from "../ItemsList";
function Home() {
  return (
    <div className="main-page">
      <div className="main">
        <h2>Healthy food Better mood</h2>
        <img src={fruits} id="fruitsImage" alt="fruitsImage" />
      </div>
      <div className="carousel-items-block">
        <ItemsList />
      </div>
      <div>REVIEWS</div>
    </div>
  );
}

export default Home;
