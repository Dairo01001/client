import axios from "axios";

export const createCombo = async (combo) => {
  return (await axios.post("/api/combo", combo)).data;
};

export const getCombos = async () => {
  return (await axios.get("/api/combo")).data;
};

export const deleteCombo = async (id) => {
  return (await axios.delete(`/api/combo/${id}`)).data;
};
