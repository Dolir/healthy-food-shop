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
  const [openFilter, setOpenFilter] = React.useState(false);
  return (
    <div className="shop-container">
      {params.searchTerm ? (
        ""
      ) : (
        <Filter
          setFilters={setFilters}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
        />
      )}
      <ItemsGrid filters={filters} setOpenFilter={setOpenFilter} />
    </div>
  );
}

export default Shop;
