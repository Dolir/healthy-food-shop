import React from "react";
import "../../styles/shop.css";
import ItemsGrid from "./ItemsGrid";
import Filter from "./Filter";
function Shop() {
  const [filters, setFilters] = React.useState({
    maxprice: 9999999999999,
    minprice: 0,
    category: [],
    type: [],
    additional: [],
  });
  return (
    <div className="shop-container">
      <Filter setFilters={setFilters} />
      <ItemsGrid filters={filters} />
    </div>
  );
}

export default Shop;
