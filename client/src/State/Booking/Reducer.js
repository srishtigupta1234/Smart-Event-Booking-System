import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  GET_BOOKINGS_SUCCESS,
  CANCEL_BOOKING_SUCCESS,
} from "./ActionType";

const initialState = {
  bookings: [],
  latestBooking: null,
  loading: false,
  error: null,
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        latestBooking: action.payload,
      };

    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };

    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.filter((b) => b.bookingId !== action.payload && b.id !== action.payload),
        latestBooking: state.latestBooking?.id === action.payload ? null : state.latestBooking,
      };

    case BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};