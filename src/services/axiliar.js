import axios from "axios";

export const getAuxiliares = async () => {
  return (await axios.get("/api/auxiliar")).data;
};
