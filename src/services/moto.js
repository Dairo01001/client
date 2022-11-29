import axios from "axios";

export const buscarMotoPlaca = async (plaque) => {
  return (await axios.get(`/api/moto/${plaque}`)).data;
};

export const getMotosDia = async () => {
  return (await axios.get(`/api/fecha`)).data
}