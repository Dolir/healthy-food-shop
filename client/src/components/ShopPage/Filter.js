import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {
  selectPriceRange,
  getMaxPrice,
  getMinPrice,
} from "../../features/items/itemsSlice";
import { useSelector, useDispatch } from "react-redux";
function Filter({ Filters, setFilters }) {
  const priceRange = useSelector(selectPriceRange);
  const [value, setValue] = React.useState([priceRange.min, priceRange.max]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMaxPrice());
    dispatch(getMinPrice());
  }, []);
  React.useEffect(() => {
    handleSlide([priceRange.min, priceRange.max]);
  }, [priceRange]);
  function handleSlide(data) {
    let result = [parseInt(data[0]), parseInt(data[1])];
    console.log(result);
    setValue(result);
  }
  function handleChange(e) {
    if (e.target.value === "") {
      return;
    }
    if (e.target.name === "min") {
      setValue((prev) => [e.target.value, prev[1]]);
    } else {
      setValue((prev) => [prev[0], e.target.value]);
    }
  }
  return (
    <div className="filter">
      <h2>Filters</h2>
      <div className="price-range-container">
        <div className="price-range-text">
          <span>
            <p>From</p>
            <input
              type="number"
              name="min"
              value={value[0]}
              onChange={handleChange}
              placeholder="hey"
            />
          </span>
          <span>
            <p>Till</p>
            <input
              type="number"
              name="max"
              value={value[1]}
              onChange={handleChange}
            />
          </span>
        </div>
        <Nouislider
          range={{
            min: priceRange.min,
            max: priceRange.max,
          }}
          start={[value[0], value[1]]}
          onChange={handleSlide}
          connect
        />
      </div>
      <div className="filter-category">
        <h4>Category</h4>
        <ul>
          <li>
            <input type="checkbox" defaultChecked />
            All
          </li>
          <li>
            <input type="checkbox" />
            Fruits
          </li>
          <li>
            <input type="checkbox" />
            Vegetables
          </li>
        </ul>
      </div>
      <div className="filter-type">
        <h4> Type</h4>
        <ul>
          <li>
            <input type="checkbox" defaultChecked />
            All
          </li>
          <li>
            <input type="checkbox" />
            Apple
          </li>
          <li>
            <input type="checkbox" />
            Orange
          </li>
        </ul>
      </div>
      <div className="filter-checkboxes">
        <h4>Additional</h4>
        <ul>
          <li>
            <input type="checkbox" />
            On sale
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
