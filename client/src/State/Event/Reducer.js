import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  EVENT_CREATE_SUCCESS,
  EVENT_UPDATE_SUCCESS,
  EVENT_DELETE_SUCCESS,
  EVENT_GET_ONE_SUCCESS,
} from "./ActionType";

const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {

    case EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };

    case EVENT_GET_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedEvent: action.payload,
      };

    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
      };

    case EVENT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.map((event) =>
          event.id === action.payload.id
            ? action.payload
            : event
        ),
        selectedEvent:
          state.selectedEvent?.id === action.payload.id
            ? action.payload
            : state.selectedEvent,
      };

    case EVENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter(
          (event) => event.id !== action.payload
        ),
      };

    case EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};