import axios from "axios";

export const getDetailDate = async (id) => {
  return (await axios.get(`/api/report/${id}`)).data;
};
