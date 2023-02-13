import axios from "axios";

export const getDetailDate = async (id) => {
  return (await axios.get(`/api/report/${id}`)).data;
};

export const getData = async (startDate) => {
  return (await axios.get(`/api/report?date=${startDate}`)).data;
};

export const getDataDrawOut = async (startDate) => {
  return (await axios.get(`/api/report/drawout?date=${startDate}`)).data;
};
