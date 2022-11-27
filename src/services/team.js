import axios from "axios";

export const getTeams = async () => (await axios.get("/api/team")).data;

export const createTeam = async (team) =>
  (await axios.post("/api/team", team)).data;

export const eliminarEquipo = async (id) => {
  return (await axios.delete(`/api/team/${id}`)).data;
};

export const getOperatorsTeam = async () => {
  return (await axios.get("/api/team?employee=1")).data;
};
