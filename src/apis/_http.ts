import axios from "axios";
import store from "../store";

const BASE_URL = process.env.REACT_APP_API_URL;

const _http = axios.create({
  baseURL: BASE_URL,
});
_http.interceptors.request.use(
  function (config) {
    const token = store.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { _http };
