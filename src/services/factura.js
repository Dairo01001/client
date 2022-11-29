import axios from "axios";

export const createFacturaPreventa = async (data) => {
  return (await axios.post("/api/factura", data)).data;
};
