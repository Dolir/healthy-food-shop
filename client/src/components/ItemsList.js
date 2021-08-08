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
  return (
    <div>
      <h3>
        <a href="#">Best selling</a>
      </h3>
      <div>
        <button>
          <img src={arrow} id="arrow-left" />
        </button>
        <button>
          <img src={arrow} id="arrow-right" />
        </button>
      </div>
      <ul className="itemsList">
        {items.items.map((item, key) => (
          <Item item={item} key={key} />
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
