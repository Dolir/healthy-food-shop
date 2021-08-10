import React from "react";
function Item({ item }) {
  return (
    <li className="item">
      <div>
        <img src={item.url} className="itemImg" alt="ItemImg" />
        <img alt="" />
      </div>
      <div>
        <span className="old-price">
          {parseInt(item.price) + parseInt(item.discount) + 5}$
        </span>
        <h3 className="item-price">{item.price}$</h3>
        <h3 className="item-name">{item.name}</h3>
        {/* <p>{item.description}</p>   */}
      </div>
      <div>
        <button className="tocart-btn">TO CART</button>
        <img alt="" />
      </div>
    </li>
  );
}

export default Item;
