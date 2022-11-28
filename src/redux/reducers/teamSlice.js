import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: null,
    operators: null,
    employees: null,
  },
  reducers: {
    addTeams: (state, { payload }) => {
      state.teams = payload;
    },
    addOperatorsTeam: (state, { payload }) => {
      state.operators = payload;
    },
    addEmployees: (state, { payload }) => {
      state.employees = payload;
    },
  },
});

export const { addTeams, addOperatorsTeam, addEmployees } = teamSlice.actions;
export default teamSlice.reducer;
