import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: null,
  },
  reducers: {
    addColors: (state, { payload }) => {
      state.colors = payload;
    },
  },
});

export const { addColors } = colorSlice.actions;
export default colorSlice.reducer;
