import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};