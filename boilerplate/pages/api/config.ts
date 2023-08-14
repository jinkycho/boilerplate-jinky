import axios from "axios";

const encode = btoa(
  "187806a5c91740edbc79d2ddd4c5993e:325030cde4cf4576b38e6b019e02223c"
);

export const spotifyAccessInstance = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const spotifyInstance = axios.create({
  baseURL: "https://api.spotify.com/",
});

spotifyAccessInstance.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("access_token");
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
});
