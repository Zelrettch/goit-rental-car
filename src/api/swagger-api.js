import axios from "axios";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchBrands = async () => {
  return await api.get("/brands");
};
