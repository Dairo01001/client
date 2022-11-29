import axios from "axios";

export const createFacturaPreventa = async (data) => {
  return (await axios.post("/api/factura", data)).data;
};

export const setEmployeesFactura = async ({ id, Employees }) => {
  return (await axios.post(`/api/factura/${id}`, { Employees })).data;
};

export const getFacturaId = async (id) => {
  return (await axios.get(`/api/factura/${id}`)).data;
};
