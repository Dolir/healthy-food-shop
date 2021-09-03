import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, addCartItemAsync } from "../features/cart/cartSlice";
function Item({ item }) {
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false);
  const auth = useSelector((state) => state.auth);

  function handleToCart() {
    setModal(true);

    if (auth.isAuthenticated) {
      dispatch(
        addCartItemAsync({
          item: { ...item, quantity: 1 },
          userID: auth.user._id,
        })
      );
    } else {
      dispatch(addCartItem({ ...item, quantity: 1 }));
    }
    setTimeout(() => setModal(false), 3000);
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
              <h3 alt="empty-space"></h3>
            ) : (
              parseInt(item.price) + parseInt(item.discount) + "$"
            )}
          </span>
          <h3 className="item-price">{item.price}$</h3>
          <h3 className="item-name">{item.name}</h3>
        </div>
      </Link>
      <div>
        {
          <div
            className="item-modal"
            style={modal ? { opacity: 1 } : { opacity: 0 }}
          >
            Added to cart
          </div>
        }
        <button className="tocart-btn" onClick={handleToCart}>
          TO CART
        </button>
        <img alt="" />
      </div>
    </li>
  );
}

export default Item;
