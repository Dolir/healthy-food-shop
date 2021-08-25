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
    // Create PaymentIntent as soon as the page loads
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
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
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
      className="modal-container"
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
            <CardNumberElement
              className="card-element"
              id="card-number"
              options={cardStyle}
              onChange={handleChange}
            />
            <CardExpiryElement
              className="card-element"
              id="card-expr"
              options={cardStyle}
              onChange={handleChange}
            />
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
            {/* Show any error that happens when processing the payment */}
            {/* Show a success message upon completion */}
          </form>
        )}
      </div>
    </div>
  );
}
