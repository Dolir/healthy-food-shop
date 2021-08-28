import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  login,
  openLoginModal,
  closeLoginModal,
} from "../../features/auth/authSlice";

import { clearErrors } from "../../features/auth/errorSlice";
function LoginModal() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error.error);
  const loginModal = useSelector((state) => state.auth.loginModal);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    msg: null,
  });
  React.useEffect(
    (prev) => {
      if (error !== prev) {
        setState({ ...state, msg: error.msg });
      }
      if (state.modal) {
        if (isAuthenticated) {
          toggle();
        }
      }
    },
    [error, isAuthenticated]
  );

  function toggle() {
    dispatch(clearErrors());
    if (loginModal) {
      dispatch(closeLoginModal());
    } else {
      dispatch(openLoginModal());
    }
  }
  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password,
    };
    dispatch(login(user));
  }
  return (
    <div>
      <div onClick={toggle} className="Signin">
        Login
      </div>
      <div
        className="modal-container"
        style={
          loginModal
            ? { transform: "translateX(1500px)", pointerEvents: "auto" }
            : { transform: "translateX(-1500px)", pointerEvents: "none" }
        }
      >
        <div className="modal">
          <div className="modal-header">
            <h2>Login</h2> <button onClick={toggle}>&times;</button>
          </div>
          <div className="modal-dialog">
            <form onSubmit={onSubmit} className="modal-form">
              {state.msg ? <div className="danger">{state.msg}</div> : ""}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={onChange}
                />
              </div>

              <button type="submit" color="dark" style={{ marginTop: "2rem" }}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
