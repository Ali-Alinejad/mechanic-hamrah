"use client";

import { Provider } from "react-redux";
import store from "./store"; // مسیر درست به فایل store

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
