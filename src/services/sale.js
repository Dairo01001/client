import axios from "axios";

export const getFacturacionEmpleados = async () =>
  (await axios.get("/api/sale")).data;
