import axios from "axios";

export const api = axios.create({
  baseURL: "https://veiga-nlw-valoriza.herokuapp.com",
});
