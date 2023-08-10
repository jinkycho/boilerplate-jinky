import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useMutation, useQuery } from "react-query";
import { GetAccessToken } from "../api/spotify";

const index = () => {
  const [player, setPlayer] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const { mutate: tokenMutate } = useMutation({
    mutationFn: GetAccessToken,
    onSuccess: (res) => {
      console.log("res", res);
      const { access_token } = res;
      setToken(access_token);
    },
  });

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener(
        "not_ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Device ID has gone offline", device_id);
        }
      );

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", (res) => {
        console.log("res", res);
      });

      player.addListener("playback_error", ({ message }) => {
        console.log("message", message);
      });

      player.connect();
      console.log("player", player);
    };
  }, [token]);

  return (
    <div>
      <button onClick={() => tokenMutate()}>토큰 가져오기</button>
    </div>
  );
};

export default index;
