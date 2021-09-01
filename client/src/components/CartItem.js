import React from "react";
import { Link } from "react-router-dom";

function CartItem({ item, handleDeleteItem, handleChange }) {
  const [count, setCount] = React.useState(item.quantity);
  React.useEffect(() => {
    setCount(item.quantity);
  }, [item.quantity]);
  const onChange = (e) => {
    if (!e.target.value) {
      setCount("");
      return;
    }
    if (parseInt(e.target.value) === 0) {
      return;
    } else {
      handleChange(e.target.value, item._id);
    }
  };
  function onMouseLeave(e) {
    if (!e.target.value) {
      setCount("1");
      return;
    }
  }
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
          value={count}
          minLength={0}
          min={0}
          max={999}
          onChange={onChange}
          onMouseLeave={onMouseLeave}
        />
        <div>
          <strong>{item.price}$</strong> <p>{item.discount}% off</p>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
