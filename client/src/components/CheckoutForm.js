import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { addOrder } from "../features/orders/ordersSlice";
export default function CheckoutForm({
  checkoutForm,
  setCheckoutForm,
  cartItems,
  setOrder,
  order,
}) {
  const dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    window
      .fetch("/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setOrder((prev) => ({
          ...prev,
          totalAmount: data.amount,
          created: data.created,
        }));
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch(addOrder(order));
    }
  };
  function toggle() {
    setCheckoutForm(false);
  }
  return (
    <div
      className="modal-container not-transform "
      style={
        checkoutForm
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <div className="modal">
        <button id="close-btn" onClick={toggle}>
          &times;
        </button>
        {succeeded ? (
          <p className="result-message">Payment succeeded!</p>
        ) : (
          <form id="payment-form" onSubmit={handleSubmit}>
            {" "}
            {error && (
              <div className="card-error" role="alert" style={{ color: "red" }}>
                {error}
              </div>
            )}
            <h3>Card number</h3>
            <CardNumberElement
              className="card-element"
              id="card-number"
              options={cardStyle}
              onChange={handleChange}
            />
            <h3>Expiration date</h3>
            <CardExpiryElement
              className="card-element"
              id="card-expr"
              options={cardStyle}
              onChange={handleChange}
            />
            <h3>CVC</h3>
            <CardCvcElement
              className="card-element"
              id="card-cvc"
              options={cardStyle}
              onChange={handleChange}
            />
            <button disabled={processing || disabled || succeeded} id="submit">
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
