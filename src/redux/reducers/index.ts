import { combineReducers } from "@reduxjs/toolkit";
import gpaReducer from "./gpa.reducer";

export const rootReducer = combineReducers({
  gpa: gpaReducer,
});
