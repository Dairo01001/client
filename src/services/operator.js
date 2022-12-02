import axios from "axios";

export const getOperators = async () => {
  return (await axios.get("/api/operator")).data;
};

export const getGanacias = async (id) => {
  const date = new Date();
  const formaDate = `${date.getFullYear()}/${date.getMonth() + 1}/${
    date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  }`;
  return (await axios.get(`/api/operator/${id}?date=${formaDate}`)).data;
};
