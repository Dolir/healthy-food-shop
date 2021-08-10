import React from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { selectItems, getItems } from "../features/items/itemsSlice";
import "../styles/items.css";
import arrow from "../images/arrow.png";
import LoadingBlock from "./LoadingBlock";
function ItemsList() {
  const [counter, setCounter] = React.useState(0);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const itemsList = document.querySelector(".itemsList");
  const itemsContainer = document.querySelector(".items-container");
  React.useEffect(() => {
    dispatch(getItems());
  }, []);
  React.useEffect(() => {
    if (!itemsList) return;
    itemsList.style.transform = `translateX(-${
      itemsList.children[0].clientWidth * counter
    }px)`;
  }, [counter]);

  function arrowSlideLeft(e) {
    if (counter <= 0) {
      setCounter(
        Math.round(
          itemsList.children.length -
            itemsContainer.clientWidth / itemsList.children[0].clientWidth
        )
      );
    } else {
      setCounter(counter - 1);
    }
  }
  function arrowSlideRight(e) {
    if (
      counter >=
      Math.round(
        itemsList.children.length -
          itemsContainer.clientWidth / itemsList.children[0].clientWidth
      )
    ) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }

  return (
    <div className="carousel">
      <h1 className="best-selling">Best selling</h1>
      <div>
        <button onClick={arrowSlideLeft} className="arrow-left-btn">
          <img src={arrow} id="arrow-left" alt="left-arrow" />
        </button>
        <button onClick={arrowSlideRight} className="arrow-right-btn">
          <img src={arrow} id="arrow-right" alt="right-arrow" />
        </button>
      </div>
      <div className="items-container">
        {items.isLoading ? (
          <ul className="itemsList">
            <li className="item">
              <LoadingBlock />
            </li>
            <li className="item">
              <LoadingBlock />
            </li>
            <li className="item">
              <LoadingBlock />
            </li>
            <li className="item">
              <LoadingBlock />
            </li>
            <li className="item">
              <LoadingBlock />
            </li>
            <li className="item">
              <LoadingBlock />
            </li>
          </ul>
        ) : (
          <ul className="itemsList">
            {items.items.map((item, key) => (
              <Item item={item} key={key} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ItemsList;
