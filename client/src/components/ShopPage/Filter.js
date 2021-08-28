import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {
  selectPriceRange,
  getMaxPrice,
  getMinPrice,
} from "../../features/items/itemsSlice";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Filter({ setFilters, openFilter, setOpenFilter }) {
  const priceRange = useSelector(selectPriceRange);
  const [options, setOptions] = React.useState({
    min: priceRange.min,
    max: priceRange.max,
    category: [],
    type: [],
    additional: [],
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getMaxPrice());
    dispatch(getMinPrice());
  }, []);
  React.useEffect(() => {
    handleSlide([priceRange.min, priceRange.max]);
  }, [priceRange]);
  function handleSlide(data) {
    setOptions((prev) => ({
      ...prev,
      min: parseInt(data[0]),
      max: parseInt(data[1]),
    }));
  }
  function handlePrice(e) {
    if (e.target.value === "") {
      return;
    }
    if (e.target.name === "min") {
      setOptions((prev) => ({ ...prev, min: e.target.value }));
    } else {
      setOptions((prev) => ({ ...prev, max: e.target.value }));
    }
  }
  function handleSubmit() {
    setOpenFilter(false);
    setFilters({
      maxprice: options.max,
      minprice: options.min,
      category: options.category,
      type: options.type,
      additional: options.additional,
    });
  }
  function handleClear() {
    setOpenFilter(false);
    setOptions({
      min: priceRange.min,
      max: priceRange.max,
      category: [],
      type: [],
      additional: [],
    });
    setFilters({
      minprice: priceRange.min,
      maxprice: priceRange.max,
      category: [],
      type: [],
      additional: [],
    });
    const cbs = document.querySelectorAll('input[type="checkbox"]');
    cbs.forEach((cb) => {
      cb.checked = false;
    });
  }
  function handleChange(e) {
    if (e.target.nodeName === "INPUT") {
      if (e.target.checked) {
        switch (
          e.target.parentElement.parentElement.previousSibling.innerText.toLowerCase()
        ) {
          case "category":
            setOptions((prev) => ({
              ...prev,
              category: [
                ...prev.category,
                e.target.parentElement.attributes.value.value,
              ],
            }));
            break;
          case "type":
            setOptions((prev) => ({
              ...prev,
              type: [
                ...prev.type,
                e.target.parentElement.attributes.value.value,
              ],
            }));
            break;
          case "additional":
            setOptions((prev) => ({
              ...prev,
              additional: [
                ...prev.additional,
                e.target.parentElement.attributes.value.value,
              ],
            }));
            break;
          default:
            setOptions((prev) => ({ ...prev }));
            break;
        }
      } else {
        switch (
          e.target.parentElement.parentElement.previousSibling.innerText.toLowerCase()
        ) {
          case "category":
            setOptions((prev) => ({
              ...prev,
              category: prev.category.filter(
                (x) => x !== e.target.parentElement.attributes.value.value
              ),
            }));
            break;
          case "type":
            setOptions((prev) => ({
              ...prev,
              type: prev.type.filter(
                (x) => x !== e.target.parentElement.attributes.value.value
              ),
            }));
            break;
          case "additional":
            setOptions((prev) => ({
              ...prev,
              additional: prev.additional.filter(
                (x) => x !== e.target.parentElement.attributes.value.value
              ),
            }));
            break;
          default:
            setOptions((prev) => ({ ...prev }));
            break;
        }
      }
    } else {
      if (!e.target.children[0].checked) {
        switch (
          e.target.parentElement.previousSibling.innerText.toLowerCase()
        ) {
          case "category":
            setOptions((prev) => ({
              ...prev,
              category: [...prev.category, e.target.attributes.value.value],
            }));
            break;
          case "type":
            setOptions((prev) => ({
              ...prev,
              type: [...prev.type, e.target.attributes.value.value],
            }));
            break;
          case "additional":
            setOptions((prev) => ({
              ...prev,
              additional: [...prev.additional, e.target.attributes.value.value],
            }));
            break;
          default:
            setOptions((prev) => ({ ...prev }));
            break;
        }
      } else {
        switch (
          e.target.parentElement.previousSibling.innerText.toLowerCase()
        ) {
          case "category":
            setOptions((prev) => ({
              ...prev,
              category: prev.category.filter(
                (x) => x !== e.target.attributes.value.value
              ),
            }));
            break;
          case "type":
            setOptions((prev) => ({
              ...prev,
              type: prev.type.filter(
                (x) => x !== e.target.attributes.value.value
              ),
            }));
            break;
          case "additional":
            setOptions((prev) => ({
              ...prev,
              additional: prev.additional.filter(
                (x) => x !== e.target.attributes.value.value
              ),
            }));
            break;
          default:
            setOptions((prev) => ({ ...prev }));
            break;
        }
      }
      e.target.children[0].checked = e.target.children[0].checked
        ? false
        : true;
    }
  }
  return (
    <div className="filter-container">
      <div className="filter">
        <h2>Filters</h2>
        <div className="price-range-container">
          <div className="price-range-text">
            <span>
              <p>From</p>
              <input
                type="number"
                name="min"
                value={options.min}
                onChange={handlePrice}
                placeholder="hey"
              />
            </span>
            <span>
              <p>Till</p>
              <input
                type="number"
                name="max"
                value={options.max}
                onChange={handlePrice}
              />
            </span>
          </div>
          <Nouislider
            range={{
              min: priceRange.min,
              max: priceRange.max,
            }}
            start={[options.min, options.max]}
            onChange={handleSlide}
            connect
          />
        </div>
        <div className="filter-category">
          <h4>Category</h4>
          <ul>
            <li onClick={handleChange} value="fruits">
              <input type="checkbox" />
              Fruits
            </li>
            <li onClick={handleChange} value="vegetables">
              <input type="checkbox" />
              Vegetables
            </li>
          </ul>
        </div>
        <div className="filter-type">
          <h4>Type</h4>
          <ul>
            <li onClick={handleChange} value="apple">
              <input type="checkbox" />
              Apple
            </li>
            <li onClick={handleChange} value="orange">
              <input type="checkbox" />
              Orange
            </li>
            <li onClick={handleChange} value="tomato">
              <input type="checkbox" />
              Tomato
            </li>
          </ul>
        </div>
        <div className="filter-checkboxes">
          <h4>Additional</h4>
          <ul>
            <li onClick={handleChange} value="onsale">
              <input type="checkbox" />
              On sale
            </li>
          </ul>
        </div>
        <div className="filter-btns">
          <Link to="/shop/page/1">
            <button id="show-btn" onClick={handleSubmit}>
              Show
            </button>
          </Link>
          <Link to="/shop/page/1">
            <button id="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </Link>
        </div>
      </div>
      <div
        className="adaptive-filter filter"
        style={
          openFilter
            ? {
                opacity: 1,
                pointerEvents: "auto",
              }
            : {
                opacity: 0,
                pointerEvents: "none",
              }
        }
      >
        <h2>Filters</h2>
        <div className="price-range-container">
          <div className="price-range-text">
            <span>
              <p>From</p>
              <input
                type="number"
                name="min"
                value={options.min}
                onChange={handlePrice}
                placeholder="hey"
              />
            </span>
            <span>
              <p>Till</p>
              <input
                type="number"
                name="max"
                value={options.max}
                onChange={handlePrice}
              />
            </span>
          </div>
          <Nouislider
            range={{
              min: priceRange.min,
              max: priceRange.max,
            }}
            start={[options.min, options.max]}
            onChange={handleSlide}
            connect
          />
        </div>
        <div className="filter-category">
          <h4>Category</h4>
          <ul>
            <li onClick={handleChange} value="fruits">
              <input type="checkbox" />
              Fruits
            </li>
            <li onClick={handleChange} value="vegetables">
              <input type="checkbox" />
              Vegetables
            </li>
          </ul>
        </div>
        <div className="filter-type">
          <h4>Type</h4>
          <ul>
            <li onClick={handleChange} value="apple">
              <input type="checkbox" />
              Apple
            </li>
            <li onClick={handleChange} value="orange">
              <input type="checkbox" />
              Orange
            </li>
            <li onClick={handleChange} value="tomato">
              <input type="checkbox" />
              Tomato
            </li>
          </ul>
        </div>
        <div className="filter-checkboxes">
          <h4>Additional</h4>
          <ul>
            <li onClick={handleChange} value="onsale">
              <input type="checkbox" />
              On sale
            </li>
          </ul>
        </div>
        <div className="filter-btns">
          <Link to="/shop/page/1">
            <button id="show-btn" onClick={handleSubmit}>
              Show
            </button>
          </Link>
          <Link to="/shop/page/1">
            <button id="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Filter;
