import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";
function Item({ item }) {
  const dispatch = useDispatch();
  function handleToCart() {
    dispatch(addCartItem(item));
  }
  return (
    <li className="item">
      <Link to={`/shop/id/${item._id}`} className="default-link">
        <div>
          <img src={item.url} className="itemImg" alt="ItemImg" />
          <img alt="" />
        </div>
        <div>
          <span className="old-price">
            {parseInt(item.discount) === 0 ? (
              <h3></h3>
            ) : (
              parseInt(item.price) + parseInt(item.discount) + "$"
            )}
          </span>
          <h3 className="item-price">{item.price}$</h3>
          <h3 className="item-name">{item.name}</h3>
          {/* <p>{item.description}</p>   */}
        </div>
      </Link>
      <div>
        <button className="tocart-btn" onClick={handleToCart}>
          TO CART
        </button>
        <img alt="" />
      </div>
    </li>
  );
}

export default Item;
