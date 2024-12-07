import axios from "axios";
import configFile from "../config.json";

const httpService = axios.create({
  baseURL: configFile.API,
});

httpService.interceptors.request.use(
  (config) => {
    const containSlash = config.url.endsWith("/");
    config.url =
      (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use((res) => {
  res.data = transformData(res.data);

  return res;
});

function transformData(data) {
  return data.id
    ? data
    : Object.keys(data).map((key) => ({ ...data[key], id: key }));
}

export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  patch: httpService.patch,
};
