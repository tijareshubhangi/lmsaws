import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.232.78.236:9000/",
  timeout: 15000,
});

export default instance;
