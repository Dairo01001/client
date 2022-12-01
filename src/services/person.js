import axios from "axios";

export const getPersonID = async (id) => {
  return (await axios.get(`/api/person/${id}`)).data;
};
