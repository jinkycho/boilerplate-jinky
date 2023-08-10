import React, { useState, useEffect } from "react";

interface IPlayback {
  props: any;
}
const Playback = (props: any) => {
  const [player, setPlayer] = useState<any>(null);

  console.log("prop", props);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    const token =
      "BQC5XLBhRUtECVPl67gqgUX0kFi1FD_61nYrwGwV4KsQgAYCs8AbfO1xQ0Kzg1G70VtWU4PXBso32ET7aZomHynFBj9XQYNigwuWQajHt136N_wxGF8rCqtdxyqyyjnKIoAjVRSuKBEyJEcrjqT9kwngrg0jBI34kfIiHu_CTIrfae8pLErK7v3y2H5wS67BoaJKD2SkyZoCYrPN0dO5zMbzLZtV7-X-";

    console.log("props", props);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          cb(props.token);
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

      console.log("player", player);
      player.connect();
    };
  }, []);

  return <div>Playback</div>;
};

export default Playback;
