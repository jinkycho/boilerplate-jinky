import queryString from "query-string";
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

export const GetPlaylist = async (playlist_id: string) => {
  const { data } = await spotifyAccessInstance.get(`/playlists/${playlist_id}`);
  return data;
};

export const GetPlaylists = async () => {
  const { data: me } = await spotifyAccessInstance.get("/me");
  if (!me) return;

  const { data } = await spotifyAccessInstance.get(
    `/users/${me.id}/playlists/`
  );
  return data;
};

export const AddPlayQueue = async (params: {
  uri: string;
  device_id: string;
}) => {
  const qs = queryString.stringify(params);

  try {
    const data = await spotifyAccessInstance.post(`/me/player/queue?${qs}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const TransferPlayback = async (device_id: string) => {
  try {
    const data = await spotifyAccessInstance.put(`/me/player`, {
      device_ids: [device_id],
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const GetUserQueue = async () => {
  const { data } = await spotifyAccessInstance.get("me/player/queue");
  return data;
};

export const StartPlayback = async (device_id: string, context_uri: string) => {
  try {
    const data = await spotifyAccessInstance.put(`/me/player/play`, {
      // device_ids: [device_id],
      context_uri,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
