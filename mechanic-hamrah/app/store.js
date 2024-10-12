import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // مسیر صحیح به فایل reducers

const store = configureStore({
  reducer: {
    auth: rootReducer, // اطمینان حاصل کنید که auth در اینجا وجود دارد
  },
});

export default store;
