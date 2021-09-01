import React from "react";
import { NavLink } from "react-router-dom";
function CartModal({ modal, setModal }) {
  return (
    <div
      className="modal-container not-transform"
      style={
        modal
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <div className="modal" style={{ width: 300 }}>
        <div className="modal-header">
          <h2>Added to cart</h2>{" "}
          <button onClick={() => setModal((prev) => !prev)}>&times;</button>
        </div>
        <div className="modal-dialog">
          <NavLink
            to="/cart"
            style={{
              margin: 10,
              width: "100%",
              marginBottom: 0,
            }}
          >
            <button
              type="submit"
              color="dark"
              style={{
                backgroundColor: " darkred ",
                marginBottom: 0,
              }}
            >
              Go to cart
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
