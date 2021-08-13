import React from "react";
import Item from "../Item";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, getItems } from "../../features/items/itemsSlice";
function ItemsGrid() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getItems());
  }, []);
  console.log(items);
  return (
    <div className="items-grid-container">
      <div className="items-sort">sort</div>
      <div className="items-grid">
        <ul className="items-grid-list">
          {!items.isLoading
            ? items.items.map((item, key) => <Item item={item} key={key} />)
            : ""}
        </ul>
      </div>
      <div className="items-pages">items pages btns</div>
    </div>
  );
}

export default ItemsGrid;
