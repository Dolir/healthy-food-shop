import React from "react";
import Item from "./Item";
function ItemsList() {
  return (
    <div>
      <h3>
        <a href="#">Best selling</a>
      </h3>
      <div>
        <button></button>
        <button></button>
      </div>
      <ul>
        <li>
          <Item />
        </li>
      </ul>
    </div>
  );
}

export default ItemsList;
