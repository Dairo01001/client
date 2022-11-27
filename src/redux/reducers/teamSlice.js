import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: null,
    operators: null,
  },
  reducers: {
    addTeams: (state, { payload }) => {
      state.teams = payload;
    },
    addOperatorsTeam: (state, { payload }) => {
      state.operators = payload;
    },
  },
});

export const { addTeams, addOperatorsTeam } = teamSlice.actions;
export default teamSlice.reducer;
