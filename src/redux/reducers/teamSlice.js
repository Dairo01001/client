import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: null,
    employeesTeam: [],
    TeamId: "",
    operators: null,
    employees: null,
  },
  reducers: {
    addTeamId: (state, { payload }) => {
      state.TeamId = payload;
    },
    addTeams: (state, { payload }) => {
      state.teams = payload;
    },
    addEmployeesTeam: (state, { payload }) => {
      state.employeesTeam = payload;
    },
    addEmployeeTeam: (state, { payload }) => {
      state.employeesTeam = [...state.employeesTeam, payload];
    },
    removeEmployeeTeam: (state, { payload }) => {
      state.employeesTeam = state.employeesTeam.filter((id) => id !== payload);
    },
    addOperatorsTeam: (state, { payload }) => {
      state.operators = payload;
    },
    addEmployees: (state, { payload }) => {
      state.employees = payload;
    },
  },
});

export const {
  addTeams,
  addOperatorsTeam,
  addEmployees,
  addTeamId,
  addEmployeeTeam,
  addEmployeesTeam,
  removeEmployeeTeam,
} = teamSlice.actions;
export default teamSlice.reducer;
