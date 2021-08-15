import React from "react";
import Item from "../Item";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  getItems,
  getItemsCount,
} from "../../features/items/itemsSlice";
import { Link, useLocation } from "react-router-dom";
import SortPopup from "./SortPopup";
import classNames from "classnames";
function ItemsGrid({ filters }) {
  const { pathname } = useLocation();
  const items = useSelector(selectItems);
  const [option, setOption] = React.useState("Alphabet");
  const [itemsCount, setItemsCount] = React.useState();

  const [page, setPage] = React.useState(`0`);
  const dispatch = useDispatch();
  const limit = 12;
  React.useEffect(() => {
    dispatch(getItemsCount());
    setItemsCount(items.count);
    dispatch(getItems({ sort: option, limit: limit }));
    setPage("0");
  }, [items.count, option, filters]);
  function handlePages(e) {
    const count = e.target.attributes[0].value;
    console.log(page);
    if (count === page) return;
    dispatch(getItems({ sort: option, limit: limit, skip: limit * count }));
    setPage(count);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  function PageCount(e) {
    let arr = [];
    for (let i = 1; i <= Math.ceil(itemsCount / limit); i++) {
      arr.push(i);
    }
    return arr;
  }
  return (
    <div className="items-grid-container">
      <div className="items-sort">
        <h3>Sort by:</h3>
        <SortPopup option={option} setOption={setOption} />
        {/* <div>{itemsCount}</div> */}
      </div>

      <div className="items-grid">
        <ul className="items-grid-list">
          {!items.isLoading
            ? items.items.map((item, key) => <Item item={item} key={key} />)
            : ""}
        </ul>
      </div>
      <div className="items-pages">
        {PageCount().map((x) => (
          <Link to={`/shop/page/${x}`} key={x}>
            <div
              onClick={handlePages}
              value={x - 1}
              className={classNames("just-page", {
                "active-page": pathname.endsWith(x),
              })}
            >
              {x}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsGrid;
