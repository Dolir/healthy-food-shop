import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
function Cart() {
  const cart = useSelector(selectCart);
  if (cart.cartItems.length !== 0)
    return <div>{cart.cartItems.map((x) => x.name)}</div>;
  return <div>Nothing yet</div>;
}

export default Cart;
