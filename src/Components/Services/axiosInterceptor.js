import axios from "axios";

const instance = axios.create({
  baseURL: "http://15.207.19.75:9000/",
  timeout: 15000,
});

export default instance;
