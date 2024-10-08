import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, // وضعیت اولیه کاربر (غیر وارد شده)
  },
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn; // تغییر وضعیت ورود کاربر
      console.log(state.isLoggedIn ? "شما وارد شدید" : "شما خارج شدید");
    },
  },
});

// اکشن‌ها
export const { toggleLogin } = authSlice.actions;

// ریدوسر
export default authSlice.reducer;
