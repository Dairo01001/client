import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: null,
  },
  reducers: {
    addBrands: (state, { payload }) => {
      state.brands = payload;
    },
  },
});

export const { addBrands } = brandSlice.actions;
export default brandSlice.reducer;
