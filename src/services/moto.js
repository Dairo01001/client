import axios from "axios";

export const buscarMotoPlaca = async (plaque) => {
  return (await axios.get(`/api/moto/${plaque}`)).data;
};

export const getMotosDia = async () => {
  return (await axios.get(`/api/fecha`)).data;
};

export const setPagoMoto = async ({ id, isPaid }) => {
  return (await axios.put(`/api/factura/${id}`, { isPaid })).data;
};

export const deleteFactura = async (id, token) => {
  return (
    await axios.delete(`/api/factura/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
