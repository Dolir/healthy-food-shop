import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  clearCartItem,
  updateCartItemQuantity,
  clearCart,
  clearCartAsync,
  clearCartItemAsync,
  updateCartItemQuantityAsync,
  getCartItems,
} from "../features/cart/cartSlice";
import CartItem from "./CartItem";
import "../styles/cart.css";
function Cart() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getCartItems(auth.user._id));
    }
    return () => {
      if (auth.isAuthenticated) {
        dispatch(clearCart());
      }
    };
  }, [auth.isAuthenticated]);

  if (cart === null) return;
  function handleDeleteItem(id) {
    if (auth.isAuthenticated) {
      dispatch(clearCartItemAsync({ itemID: id, userID: auth.user._id }));
    } else {
      dispatch(clearCartItem({ itemID: id }));
    }
  }
  function handleDeleteAll() {
    if (auth.isAuthenticated) {
      dispatch(clearCartAsync(auth.user._id));
    }
    dispatch(clearCart());
  }
  function getSum(cart) {
    let array = [];
    cart.map((x) => array.push(parseInt(x.price) * x.quantity));
    return array.reduce((accu, current) => accu + current);
  }
  function handleChange(value, itemID) {
    if (auth.isAuthenticated) {
      dispatch(
        updateCartItemQuantityAsync({
          userID: auth.user._id,
          itemID: itemID,
          quantity: value,
        })
      );
    } else {
      dispatch(updateCartItemQuantity({ itemID: itemID, quantity: value }));
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
            cart.cartItems.map((x, key) => (
              <CartItem
                item={x}
                handleDeleteItem={handleDeleteItem}
                handleChange={handleChange}
                key={key}
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
