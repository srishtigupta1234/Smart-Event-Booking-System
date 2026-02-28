import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  GET_BOOKINGS_SUCCESS,
  CANCEL_BOOKING_SUCCESS,
} from "./ActionType";
import toast from "react-hot-toast";
import {
  bookEventApi,
} from "../../api/bookingApi";
import axiosInstance from "../../api/axiosInstance";



export const bookEvent = (data, navigate) => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await bookEventApi(data);
    const booking = response.data ? response.data : response;

    dispatch({
      type: BOOKING_SUCCESS,
      payload: booking,
    });

    toast.success("🎉 Booking Successful!");

  } catch (error) {
    const message = error.response?.data?.message || "Booking failed";
    toast.error(message);

    dispatch({
      type: BOOKING_FAILURE,
      payload: message,
    });
  }
};

export const getUserBookings = () => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await axiosInstance.get("/bookings"); 
    console.log("Axios raw response:", response); 

    // Check if your data is nested differently
    const bookingsData = response.data.data || response.data; 
    console.log("Bookings data:", bookingsData);

    dispatch({
      type: GET_BOOKINGS_SUCCESS,
      payload: bookingsData,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch bookings",
    });
  }
};



export const cancelBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    console.log("Cancel Response:", response); 

    if (response.status === 200) {
      dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: bookingId });
      return true;
    } else {
      dispatch({
        type: BOOKING_FAILURE,
        payload: response.data.message || "Failed to cancel booking",
      });
      return false;
    }
  } catch (error) {
    console.error("Cancel Error:", error.response || error);
    dispatch({
      type: BOOKING_FAILURE,
      payload: error.response?.data?.message || "Failed to cancel booking",
    });
    return false;
  }
};
export const getBookingById = (id) => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await axiosInstance.get(`/bookings/${id}`);
    dispatch({
      type: BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch booking",
    });
  }
};