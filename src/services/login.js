import axios from "axios";

export default {
  login: async (credentials) => {
    return (await axios.post("/api/login", credentials)).data;
  },
  signup: async (employee, token) => {
    return (
      await axios.post("/api/signup", employee, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  },
};
