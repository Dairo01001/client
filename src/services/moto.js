import axios from "axios";

export const crearMotoPersona = async (data) => {
  return (await axios.post("/api/moto", data)).data;
};

export const buscarMotoPlaca = async (plaque) => {
  return (await axios.get(`/api/moto/${plaque}`)).data;
};
