import React from "react";
import {
  getSingleItem,
  selectSingleItem,
} from "../../features/items/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../../styles/singleItem.css";
function SingleItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const singleItem = useSelector(selectSingleItem);
  const history = useHistory();
  React.useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    dispatch(getSingleItem(params.id));
  }, []);
  function goBack() {
    console.log(history.goBack());
  }
  if (singleItem) {
    return (
      <div className="sngitem">
        <div className="single-item-container">
          <button onClick={goBack}>go back</button>
          <h1 className="item-name">{singleItem.name}</h1>
          <div className="single-item">
            <div className="single-item-img">
              <img src={singleItem.url} alt={singleItem.name} />
            </div>
            <div className="single-item-info">
              <div className="single-item-info-upper">
                <div className="single-item-price">
                  <h5 className="old-price">
                    {parseInt(singleItem.discount) +
                      parseInt(singleItem.price) +
                      5}
                    $
                  </h5>
                  <h3 className="item-price">{singleItem.price}$</h3>
                </div>
                <div className="single-item-btns">
                  <button className="tocart-btn buy-btn">Buy</button>
                  <button className="tocart-btn">To cart</button>
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
