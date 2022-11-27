import axios from "axios";

export const getBrands = async () => {
  return (await axios.get("/api/brand")).data;
};
