import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  openRegisterModal,
  closeRegisterModal,
} from "../../features/auth/authSlice";

import { clearErrors } from "../../features/auth/errorSlice";
function RegisterModal() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error.error);
  const registerModal = useSelector((state) => state.auth.registerModal);
  const [state, setState] = React.useState({
    name: "",
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
  const dispatch = useDispatch();

  function toggle() {
    dispatch(clearErrors());
    if (registerModal) {
      dispatch(closeRegisterModal());
    } else {
      dispatch(openRegisterModal());
    }
  }
  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    dispatch(register(user));
  }
  return (
    <div>
      <div onClick={toggle} className="Signup">
        Register
      </div>

      <div
        className="modal-container"
        style={
          registerModal
            ? {
                display: "flex",
                pointerEvents: "auto",
              }
            : {
                display: "none",
                pointerEvents: "none",
              }
        }
      >
        <div className="modal">
          <div className="modal-header">
            <h2>Register</h2> <button onClick={toggle}>&times;</button>
          </div>
          <div className="modal-dialog">
            <form onSubmit={onSubmit} className="modal-form">
              {state.msg ? <div className="danger">{state.msg}</div> : ""}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={onChange}
                />
              </div>
              <div>
                {" "}
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={onChange}
                />{" "}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={onChange}
                />
              </div>
              <button type="submit" color="dark" style={{ marginTop: "2rem" }}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
