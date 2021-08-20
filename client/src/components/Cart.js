import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  clearCartItem,
  updateCartItemQuantity,
  clearCart,
  getCartItems,
} from "../features/cart/cartSlice";
import CartItem from "./CartItem";
import "../styles/cart.css";
import { loadUser } from "../features/auth/authSlice";
function Cart() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  React.useEffect(() => {
    dispatch(loadUser());

    return () => {
      if (auth.isAuthenticated) {
        dispatch(clearCart());
      }
    };
  }, [auth.isAuthenticated, cart.isLoading]);

  if (cart === null) return;
  function handleDeleteItem(id) {
    if (auth.isAuthenticated) {
      dispatch(clearCartItem({ itemID: id, userID: auth.user._id }));
    } else {
      dispatch(clearCartItem({ itemID: id }));
    }
  }
  function handleDeleteAll() {
    if (auth.isAuthenticated) {
      dispatch(clearCart(auth.user._id));
    }
    dispatch(clearCart());
  }
  function getSum(cart) {
    let array = [];
    cart.map((x) => array.push(parseInt(x.price) * x.quantity));
    return array.reduce((accu, current) => accu + current);
  }
  function handleChange(e, itemID) {
    if (auth.isAuthenticated) {
      dispatch(
        updateCartItemQuantity({
          userID: auth.user._id,
          itemID: itemID,
          quantity: e.target.value,
        })
      );
    } else {
      dispatch(
        updateCartItemQuantity({ itemID: itemID, quantity: e.target.value })
      );
    }
  }
  // if (auth.isAuthenticated) {
  //   return (
  //     <div className="cart">
  //       <div className="cart-content">
  //         <h1>My cart</h1>
  //         <button onClick={handleDeleteAll}>Clear cart</button>
  //         <ul className="cartItems-list">
  //           {auth.user.cart.length !== 0 ? (
  //             auth.user.cart.map((x) => (
  //               <CartItem
  //                 item={x}
  //                 handleDeleteItem={handleDeleteItem}
  //                 handleChange={handleChange}
  //               />
  //             ))
  //           ) : (
  //             <div>Nothing yet</div>
  //           )}
  //         </ul>
  //         <div className="summary">
  //           <div>
  //             <h3>Summary:</h3>
  //             <span>
  //               {auth.user.cart.length !== 0 ? getSum(auth.user.cart) : 0}$
  //             </span>
  //           </div>
  //         </div>
  //         <div className="checkout">
  //           <button>Checkout</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <div className="cart">
      <div className="cart-content">
        <h1>My cart</h1>
        <button onClick={handleDeleteAll}>Clear cart</button>
        <ul className="cartItems-list">
          {cart.cartItems.length !== 0 ? (
            cart.cartItems.map((x) => (
              <CartItem
                item={x}
                handleDeleteItem={handleDeleteItem}
                handleChange={handleChange}
              />
            ))
          ) : (
            <div>Nothing yet</div>
          )}
        </ul>
        <div className="summary">
          <div>
            <h3>Summary:</h3>
            <span>
              {cart.cartItems.length !== 0 ? getSum(cart.cartItems) : 0}$
            </span>
          </div>
        </div>
        <div className="checkout">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
