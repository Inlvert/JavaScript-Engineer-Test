import { configureStore } from "@reduxjs/toolkit";
import superheroReducer from "./slices/superheroSlice";

const store = configureStore({
  reducer: {
    heroes: superheroReducer,
  },
});

export default store;
