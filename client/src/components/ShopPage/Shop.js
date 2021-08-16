import React from "react";
import "../../styles/shop.css";
import ItemsGrid from "./ItemsGrid";
import Filter from "./Filter";
function Shop() {
  const [filters, setFilters] = React.useState({});
  return (
    <div className="shop-container">
      <Filter filters={filters} setFilters={setFilters} />
      <ItemsGrid filters={filters} />
    </div>
  );
}

export default Shop;
