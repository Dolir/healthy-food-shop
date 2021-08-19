import React from "react";
import {
  getSingleItem,
  selectSingleItem,
  clearSingleItem,
} from "../../features/items/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../../styles/singleItem.css";
import { addCartItem } from "../../features/cart/cartSlice";
function SingleItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const singleItem = useSelector(selectSingleItem);
  const history = useHistory();

  React.useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    dispatch(getSingleItem(params.id));
    return () => {
      dispatch(clearSingleItem());
    };
  }, []);
  function handleToCart() {
    dispatch(addCartItem({ ...singleItem, quantity: 1 }));
  }
  function goBack() {
    history.goBack();
  }
  if (singleItem) {
    return (
      <div className="sngitem">
        <div className="single-item-container">
          <button onClick={goBack}>go back</button>
          <div className="single-item">
            <div className="single-item-img">
              <img src={singleItem.url} alt={singleItem.name} />
            </div>
            <div className="single-item-info">
              <h1 className="item-name">{singleItem.name}</h1>
              <div className="single-item-info-upper">
                <div className="single-item-price">
                  <h5 className="old-price">
                    {parseInt(singleItem.discount) === 0
                      ? ""
                      : parseInt(singleItem.price) +
                        parseInt(singleItem.discount) +
                        "$"}
                  </h5>
                  <h3 className="item-price">{singleItem.price}$</h3>
                </div>
                <div className="single-item-btns">
                  <button className="tocart-btn buy-btn">Buy</button>
                  <button className="tocart-btn" onClick={handleToCart}>
                    To cart
                  </button>
                </div>
              </div>
              <p>{singleItem.description}</p>
            </div>
          </div>
          <div>{singleItem.reviews.map((x) => x.text)}</div>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default SingleItem;
