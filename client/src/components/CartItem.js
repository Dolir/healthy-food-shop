import React from "react";
import { Link } from "react-router-dom";
function CartItem({ item, handleDeleteItem, handleChange }) {
  return (
    <li>
      <div className="left-side-cart">
        <button onClick={() => handleDeleteItem(item._id)}>&times;</button>
        <Link to={`/shop/id/${item._id}`} className="default-link">
          <img src={item.url} alt="itemimage" /> <h3>{item.name}</h3>
        </Link>
      </div>
      <div className="quantity-price">
        <input
          type="number"
          defaultValue={item.quantity}
          min={1}
          max={999}
          onChange={(e) => handleChange(e, item._id)}
        />
        <div>
          <strong>{item.price}$</strong> <p>{item.discount}% off</p>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
