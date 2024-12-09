import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; 

const store = configureStore({
  reducer: {
    auth: rootReducer, 
  },
});

export default store;
