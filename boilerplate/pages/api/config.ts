import axios from "axios";

const encode = btoa(
  "187806a5c91740edbc79d2ddd4c5993e:325030cde4cf4576b38e6b019e02223c"
);

export const spotifyAccessInstance = axios.create({
  baseURL: "https://accounts.spotify.com/",
  headers: {
    Authorization: `Basic ${encode}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // params: {
  //   grant_type: "client_credentials",
  // },
});

export const spotifyInstance = axios.create({
  baseURL: "https://api.spotify.com/",
});
