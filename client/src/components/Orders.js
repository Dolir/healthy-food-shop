import React from "react";
import { getOrders } from "../features/orders/ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import Order from "./Order";
import "../styles/orders.css";
function Orders() {
  const auth = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getOrders(auth.user._id));
    }
  }, [auth.isAuthenticated]);

  return (
    <div className="orders">
      <div className="orders-content">
        <h1>Orders</h1>
        <ul className="orderItems-list">
          {orders.orders.length !== 0 ? (
            orders.orders.map((x, key) => <Order order={x} key={key} />)
          ) : (
            <div>Nothing yet</div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
