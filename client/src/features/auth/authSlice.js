import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { returnErrors } from "./errorSlice";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (userId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    const response = await axios.get("/api/auth/user", config).catch((err) => {
      thunkAPI.dispatch(returnErrors(err.response));
      thunkAPI.dispatch({ type: "auth/authError" });
    });
    if (response) {
      thunkAPI.dispatch({ type: "auth/userLoaded", payload: response.data });
    }
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    const response = await axios
      .post("/api/users", body, config)
      .catch((err) => {
        thunkAPI.dispatch(returnErrors(err.response));
        thunkAPI.dispatch({ type: "auth/registerFail" });
      });
    thunkAPI.dispatch({ type: "auth/registerSuccess", payload: response.data });
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({
    email: user.email,
    password: user.password,
  });
  const response = await axios.post("/api/auth", body, config).catch((err) => {
    thunkAPI.dispatch(returnErrors(err.response));
    thunkAPI.dispatch({ type: "auth/loginFail" });
  });
  thunkAPI.dispatch({ type: "auth/loginSuccess", payload: response.data });
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginModal: (state, action) => {
      state.loginModal = true;
    },
    closeLoginModal: (state, action) => {
      state.loginModal = false;
    },
    openRegisterModal: (state, action) => {
      state.registerModal = true;
    },
    closeRegisterModal: (state, action) => {
      state.registerModal = false;
    },
    userLoading: (state, action) => {
      state.isLoading = true;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    authError: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
    loginFail: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
    logoutSuccess: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loginModal = false;
      localStorage.removeItem("token");
    },
    registerFail: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
  },
});
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const selectUserID = (state) => state.auth.user._id;
export const {
  userLoading,
  logoutSuccess,
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal,
} = authSlice.actions;
export default authSlice.reducer;
