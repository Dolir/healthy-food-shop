import React from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { selectItems, getItems } from "../features/items/itemsSlice";
import "../styles/items.css";
import arrow from "../images/arrow.png";
function ItemsList() {
  const [counter, setCounter] = React.useState(0);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems(7));
  }, []);
  const itemsList = document.querySelector(".itemsList");
  const item = document.querySelector(".item");
  React.useEffect(() => {
    if (!itemsList) return;
    itemsList.style.transform = `translateX(-${item.clientWidth * counter}px)`;
  }, [counter]);
  function arrowSlideLeft(e) {
    if (counter <= 0) {
      setCounter(itemsList.children.length - 4);
    } else {
      setCounter(counter - 1);
    }
  }
  function arrowSlideRight(e) {
    if (counter > itemsList.children.length - 5) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }
  return (
    <div>
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
        <ul className="itemsList">
          {items.items.map((item, key) => (
            <Item item={item} key={key} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemsList;
