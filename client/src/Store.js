import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";

import { authReducer } from "./State/Auth/Reducer";
import { eventReducer } from "./State/Event/Reducer";
import { bookingReducer } from "./State/Booking/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  booking: bookingReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);