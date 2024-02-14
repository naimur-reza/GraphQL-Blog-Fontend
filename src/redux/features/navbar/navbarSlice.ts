import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navbar: false,
  },
  reducers: {
    toggleNavbar: (state, action) => {
      state.navbar = action.payload;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
