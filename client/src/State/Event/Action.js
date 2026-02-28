import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  EVENT_CREATE_SUCCESS,
  EVENT_UPDATE_SUCCESS,
  EVENT_DELETE_SUCCESS,
  EVENT_GET_ONE_SUCCESS,
} from "./ActionType";

import {
  getAllEventsApi,
  createEventApi,
  updateEventApi,
  deleteEventApi,
  getEventByIdApi,
} from "../../api/eventApi";

export const getAllEvents = () => async (dispatch) => {
  dispatch({ type: EVENT_REQUEST });

  try {
    const data = await getAllEventsApi();

    dispatch({
      type: EVENT_SUCCESS,
      payload: data, // directly array
    });

  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch events",
    });
  }
};


export const getEventById = (id) => async (dispatch) => {
  dispatch({ type: EVENT_REQUEST });

  try {
    const data = await getEventByIdApi(id);

    dispatch({
      type: EVENT_GET_ONE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload: "Failed to fetch event",
    });
  }
};

export const createEvent = (data) => async (dispatch) => {
  dispatch({ type: EVENT_REQUEST });

  try {
    const createdEvent = await createEventApi(data);

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: createdEvent,
    });

  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to create event",
    });
  }
};


export const updateEvent = (id, data) => async (dispatch) => {
  dispatch({ type: EVENT_REQUEST });

  try {
    const updatedEvent = await updateEventApi(id, data);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: updatedEvent,
    });

  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to update event",
    });
  }
};


export const deleteEvent = (id) => async (dispatch) => {
  dispatch({ type: EVENT_REQUEST });

  try {
    await deleteEventApi(id);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
      payload: id,
    });

  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to delete event",
    });
  }
};