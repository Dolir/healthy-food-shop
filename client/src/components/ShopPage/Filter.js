import React from "react";

function Filter({ Filters, setFilters }) {
  return (
    <div className="filter">
      <div>
        <input type="range" id="price" name="price" min="0" max="11" />
        <label for="price">Price</label>
      </div>
      <div>
        Category
        <ul>
          <li>Fruits</li>
          <li>Vegetables</li>
        </ul>
      </div>
      <div>
        Type
        <ul>
          <li>Apple</li>
          <li>Orange</li>
        </ul>
      </div>
      <div>
        On sale
        <input type="checkbox" style={{ height: 30, width: 30 }} />
      </div>
    </div>
  );
}

export default Filter;
