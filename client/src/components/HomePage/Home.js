import React from "react";
import fruits from "../../images/fruits.jpg";
import "../../styles/home.css";
import ItemsList from "../ItemsList";
import Reviews from "../ReviewsBlock";
function Home() {
  return (
    <div className="main-page">
      <div className="main">
        <h2>Healthy food Better mood</h2>
        <img src={fruits} id="fruitsImage" alt="fruitsImage" />
      </div>
      <div className="content-block">
        <ItemsList />
      </div>

      <div className="content-block">
        <Reviews />
      </div>
    </div>
  );
}

export default Home;
