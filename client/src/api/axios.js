import axios from "axios";

const instancia = axios.create({
  baseURL: "http://192.168.246.164:3000/api",
  withCredentials: true,
});

export default instancia;
