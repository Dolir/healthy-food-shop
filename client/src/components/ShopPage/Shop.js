import React from "react";
import "../../styles/shop.css";
import ItemsGrid from "./ItemsGrid";
import Filter from "./Filter";
import { useParams } from "react-router-dom";
function Shop() {
  const params = useParams();
  const [filters, setFilters] = React.useState({
    maxprice: 9999999999999,
    minprice: 0,
    category: [],
    type: [],
    additional: [],
  });
  return (
    <div className="shop-container">
      {params.searchTerm ? "" : <Filter setFilters={setFilters} />}
      <ItemsGrid filters={filters} />
    </div>
  );
}

export default Shop;
