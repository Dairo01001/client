import axios from "axios";

export const getEmployeeId = async (id) => {
  return (await axios.get(`/api/employee/${id}`)).data;
};

export const deleteEmployeeId = async (id, token) =>
  (
    await axios.delete(`/api/employee/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

export const updateEmployeeId = async (id, data, token) => {
  return (
    await axios.put(`/api/employee/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
