import { AUTH_LOADING, LOGIN_SUCCESS, AUTH_ERROR, LOGOUT } from "./ActionType";

import { loginApi, registerApi } from "../../api/authApi";
import axiosInstance from "../../api/axiosInstance";

export const login = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  try {
    const res = await loginApi(data);

    localStorage.setItem("token", res.token);

    const userResponse = await axiosInstance.get("/api/users/profile");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userResponse.data,
    });

    console.log(res.data);
    console.log(userResponse.data);

  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Credentials",
    });
  }
};

export const register = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  try {
    await registerApi(data);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Registration Failed",
    });
  }
};
export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  try {
    const response = await axiosInstance.get("/api/users/profile");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({ type: LOGOUT });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
