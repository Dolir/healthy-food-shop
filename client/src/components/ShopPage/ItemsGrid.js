import React from "react";
import Item from "../Item";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  getItems,
  getItemsCount,
  clearItems,
} from "../../features/items/itemsSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import SortPopup from "./SortPopup";
import classNames from "classnames";
function ItemsGrid({ filters, setOpenFilter }) {
  const { pathname } = useLocation();
  const params = useParams();
  const items = useSelector(selectItems);
  const [option, setOption] = React.useState("Alphabet");
  const [itemsCount, setItemsCount] = React.useState();

  const [page, setPage] = React.useState(pathname[pathname.length - 1]);

  const dispatch = useDispatch();
  const limit = 12;

  React.useEffect(() => {
    dispatch(
      getItemsCount({ filters: filters, searchTerm: params.searchTerm })
    );
    setItemsCount(items.count);
    dispatch(
      getItems({
        sort: option,
        limit: limit,
        filters: filters,
        searchTerm: params.searchTerm,
      })
    );
    setPage(`${pathname[pathname.length - 1] - 1}`);
    handlePages();
    return () => {
      dispatch(clearItems());
    };
  }, [items.count, option, filters, params.searchTerm]);
  function handlePages(e) {
    const count = e
      ? e.target.attributes[0].value
      : pathname[pathname.length - 1] - 1;
    if (count === page) return;
    dispatch(
      getItems({
        sort: option,
        limit: limit,
        skip: limit * count,
        filters: filters,
        searchTerm: params.searchTerm,
      })
    );
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
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <h3>Sort by:</h3>
          <SortPopup option={option} setOption={setOption} />
        </div>

        {params.searchTerm ? (
          <h3 id="searched-for" style={{ color: "gray" }}>
            Searched for "{params.searchTerm}"
          </h3>
        ) : (
          <h3 id="open-filter" onClick={() => setOpenFilter((prev) => !prev)}>
            Filters
          </h3>
        )}
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
          <Link
            to={`${params.searchTerm ? "/search/appl" : "/shop"}/page/${x}`}
            key={x}
          >
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
