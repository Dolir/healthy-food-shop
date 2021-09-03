import React from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { selectItems, getItems } from "../features/items/itemsSlice";
import "../styles/items.css";
import arrow from "../images/arrow.png";
import LoadingBlock from "./LoadingBlock";
function ItemsList() {
  const [counter, setCounter] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const itemsList = document.querySelector(".itemsList");
  const itemsContainer = document.querySelector(".items-container");
  React.useEffect(() => {
    dispatch(getItems({ limit: 10 }));
  }, []);

  React.useEffect(() => {
    if (!itemsList) return;

    resetTimeout();
    timeoutRef.current = setTimeout(arrowSlideRight, 5000);

    itemsList.style.transform = `translateX(-${
      itemsList.children[0].clientWidth * counter
    }px)`;
    return () => {
      resetTimeout();
    };
  }, [counter, itemsList]);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
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
    if (!itemsList) return;
    else if (
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
      <h1 className="header-text">Best selling</h1>
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
            {Array(12)
              .fill(
                <li className="item">
                  <LoadingBlock className="item" />
                </li>
              )
              .map((x, key) => ({ ...x, key: key }))}
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
