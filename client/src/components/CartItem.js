import React from "react";
import { Link } from "react-router-dom";

function CartItem({ item, handleDeleteItem, handleChange }) {
  const onChange = (e) => {
    if (!e.target.value || parseInt(e.target.value) === 0) {
      console.log(e.target.value);
      handleChange(1, item._id);
    } else {
      handleChange(e.target.value, item._id);
    }
  };

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
          value={item.quantity}
          minLength={1}
          min={1}
          max={999}
          onChange={onChange}
        />
        <div>
          <strong>{item.price}$</strong> <p>{item.discount}% off</p>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
