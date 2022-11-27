import axios from "axios";

export const getColors = async () => {
  return (await axios.get("/api/color")).data;
};
