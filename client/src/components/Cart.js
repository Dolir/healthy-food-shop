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
import "../styles/checkout.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { openLoginModal, openRegisterModal } from "../features/auth/authSlice";
import { v4 as uuidv4 } from "uuid";
const promise = loadStripe(
  "pk_test_51JRd99EJ2lRaGUW3zwJ3l8brvsb9oqh9rYpdfU1YA7Ouahd2XU650g5jyiWi7kGXfoqCOBoXOFT73Qy67whxaOdR00PMj2yB65"
);

function Cart() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [order, setOrder] = React.useState({
    items: [],
    totalAmount: null,
    author_id: "",
    _id: uuidv4(),
    created: Date.now(),
  });
  const [checkoutForm, setCheckoutForm] = React.useState(false);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getCartItems(auth.user._id));
    }
    // return () => {
    //   if (auth.isAuthenticated) {
    //     dispatch(clearCart());
    //   }
    // };
  }, [auth.isAuthenticated]);
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      setOrder((prev) => ({
        ...prev,
        items: cart.cartItems,
        author_id: auth.user._id,
      }));
    }
  }, [cart.cartItems]);
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
          {auth.isAuthenticated ? (
            checkoutForm ? (
              <Elements stripe={promise}>
                <CheckoutForm
                  checkoutForm={checkoutForm}
                  setCheckoutForm={setCheckoutForm}
                  cartItems={cart.cartItems}
                  setOrder={setOrder}
                  order={order}
                />
              </Elements>
            ) : (
              <button
                id="checkout-button"
                onClick={() => setCheckoutForm(true)}
              >
                Checkout
              </button>
            )
          ) : (
            <button id="checkout-button-unlogged">
              <span onClick={() => dispatch(openLoginModal())}>Log in</span> or{" "}
              <span onClick={() => dispatch(openRegisterModal())}>
                Register
              </span>{" "}
              to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
