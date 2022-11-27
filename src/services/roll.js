import axios from "axios";

export const getRoles = async () => {
  return (await axios.get("/api/roll")).data;
};
