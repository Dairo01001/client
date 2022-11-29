import axios from "axios";

export const buscarMotoPlaca = async (plaque) => {
  return (await axios.get(`/api/moto/${plaque}`)).data;
};
