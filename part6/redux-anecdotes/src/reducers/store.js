import { configureStore } from "@reduxjs/toolkit";
import { anecdotesReducer } from "./anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer
  }
});
export default store;