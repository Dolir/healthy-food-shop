import React from "react";

function Order({ order }) {
  const date = new Date(order.created * 1000);
  return (
    <li className="order-list">
      <div className="order-list-items-container">
        <h3>Items</h3>
        <div className="order-list-items">
          {order.items.map((x) => (
            <span>
              {x.name} * {x.quantity}
            </span>
          ))}
        </div>
      </div>
      <div className="order-list-totalAmount">
        <h3>Total</h3>
        <h3>{order.totalAmount / 100}$</h3>
      </div>
      <div className="order-list-date">
        <h3>Date</h3>
        <h3 id="date-order">
          {date.toLocaleTimeString()}
          {"  "}
          {date.toLocaleDateString()}
        </h3>
      </div>
    </li>
  );
}

export default Order;
