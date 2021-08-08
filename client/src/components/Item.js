import React from "react";
function Item({ item }) {
  return (
    <li className="item">
      <div>
        <img src={item.url} className="itemImg" alt="ItemImg" />
        <img alt="" />
      </div>
      <div>
        <span>{parseInt(item.price) + parseInt(item.discount) + 5}</span>
        <h3>{item.price}</h3>
        <p>{item.description}</p>
      </div>
      <div>
        <button>To cart</button>
        <img alt="" />
      </div>
    </li>
  );
}

export default Item;
