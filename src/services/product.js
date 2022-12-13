import axios from "axios";

export const getProducts = async () => (await axios.get("/api/product")).data;

export const getProductsDrawOut = async () =>
  (await axios.get("/api/retiroproducto")).data;

export const deleteProduct = async (id, token) =>
  (
    await axios.delete(`/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

export const retirarProduct = async (data, token) =>
  (
    await axios.post(`/api/retiroproducto`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

export const retiroMenor = async (data, token) =>
  (
    await axios.post(`/api/retiro`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
