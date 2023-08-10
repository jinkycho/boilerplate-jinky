import { spotifyAccessInstance } from "./config";

const scope =
  "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
const client_id = "187806a5c91740edbc79d2ddd4c5993e";

export const GetAccessToken = async () => {
  const { data } = await spotifyAccessInstance.post("/api/token", {
    grant_type: "client_credentials",
    response_type: "code",
    scope,
    redirect_uri: "http://localhost:3000/spotify",
    client_id,
  });
  return data;
};
