import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { anecdotesReducer } from "./anecdoteReducer";
import {filterReducer} from "./filterReducer";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filters: filterReducer
})

const store = configureStore({reducer});
export default store;