import axios from "axios";

export const login = async (credentials) => {
  return (await axios.post("/api/login", credentials)).data;
};

export const signup = async (employee, token) => {
  return (
    await axios.post("/api/signup", employee, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
