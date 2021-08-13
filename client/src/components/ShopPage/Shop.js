import React from "react";
import "../../styles/shop.css";
import ItemsGrid from "./ItemsGrid";
import Filter from "./Filter";
function Shop() {
  return (
    <div className="shop-container">
      <Filter />
      <ItemsGrid />
    </div>
  );
}

export default Shop;
