import axios from "axios";

export const getOperators = async () => {
  return (await axios.get("/api/operator")).data;
};
