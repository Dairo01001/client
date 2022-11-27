import axios from "axios";

export const getEmployeeId = async (id) => {
  return (await axios.get(`/api/employee/${id}`)).data;
};
