import React from "react";
import { logoutSuccess } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
function Logout() {
  const dispatch = useDispatch();
  function logout() {
    dispatch(logoutSuccess());
    dispatch(clearCart());
  }

  return (
    <div>
      <NavLink to="/" onClick={logout} className="nav-link">
        Logout
      </NavLink>
    </div>
  );
}

export default Logout;
