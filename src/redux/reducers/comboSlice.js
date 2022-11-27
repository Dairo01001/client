import { createSlice } from "@reduxjs/toolkit";

export const comboSlice = createSlice({
  name: "combo",
  initialState: {
    combos: null,
  },
  reducers: {
    addCombos: (state, { payload }) => {
      state.combos = payload;
    },
  },
});

export const { addCombos } = comboSlice.actions;
export default comboSlice.reducer;
