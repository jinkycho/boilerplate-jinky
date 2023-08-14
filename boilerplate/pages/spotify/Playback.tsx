import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  GetPlaylist,
  GetPlaylists,
  AddPlayQueue,
  TransferPlayback,
  GetUserQueue,
  StartPlayback,
} from "../api/spotify";
import { useQuery } from "react-query";

import { useMutation, useQueryClient } from "react-query";

interface IPlayback {
  props: any;
}

const playlistId = "5FWROQspLraH27TLOODkLC";

const Playback = (props: any) => {
  const [player, setPlayer] = useState<any>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const queryClient = useQueryClient();

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
        setDeviceId(device_id);
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
        refetchQueue();
      });

      player.addListener("playback_error", ({ message }) => {
        console.log("message", message);
      });

      console.log("player", player);
      player.connect().then((success) => {
        if (success) console.log("player connected");
      });
    };
  }, []);

  const { data: playlists } = useQuery(
    ["playlists", [props.token]],
    () => GetPlaylists(),
    {
      enabled: !!props.token,
    }
  );

  console.log("playlist", playlists);

  const { data: userQueue, refetch: refetchQueue } = useQuery(
    ["userQueue", player],
    () => GetUserQueue(),
    {
      enabled: !!player,
    }
  );

  console.log("userQueue", userQueue);

  const { mutate: addPlayQueue } = useMutation(
    (body: { uri: string; device_id: string }) => AddPlayQueue(body),
    {
      onSuccess: async (res: any) => {
        console.log("플레이리스트 추가완료", res);
        queryClient.invalidateQueries("userQueue");
      },
      onError: async (err: any) => {
        console.log("플레이리스트 추가실패", err);
      },
    }
  );

  const { mutate: transferPlayback } = useMutation(
    (device_id: string) => TransferPlayback(device_id),
    {
      onSuccess: async (res: any) => {
        console.log("플레이리스트 추가완료", res);
      },
      onError: async (err: any) => {
        console.log("플레이리스트 추가실패", err);
      },
    }
  );

  const { mutate: startPlayback } = useMutation(
    ({ device_id, context_uri }: { device_id: string; context_uri: string }) =>
      StartPlayback(device_id, context_uri),
    {
      onSuccess: async (res: any) => {
        console.log("플레이리스트 추가완료", res);
        refetchQueue();
      },
      onError: async (err: any) => {
        console.log("플레이리스트 추가실패", err);
      },
    }
  );

  const handleAddQueue = (uri: string) => {
    if (!deviceId) return;

    addPlayQueue({ uri, device_id: deviceId });
  };

  const handleTransferPlayback = () => {
    if (!deviceId) return;

    transferPlayback(deviceId);
  };

  const handleStartPlayback = (playlist_id: string) => {
    if (!deviceId) return;

    refetchQueue();
    setSelectedPlaylist(playlist_id);

    const context_uri = `spotify:playlist:${playlist_id}`;

    startPlayback({ device_id: deviceId, context_uri });
  };

  return (
    <Wrapper>
      <div className="container__playlist">
        <button onClick={handleTransferPlayback}>transfer playback</button>
        {playlists && (
          <ul className="list__playlists">
            {playlists?.items.map((elem: any) => (
              <li
                onClick={() => handleStartPlayback(elem.id)}
                className={selectedPlaylist === elem.id ? "selected" : ""}
              >
                {elem.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="container__player">
        {userQueue?.currently_playing ? (
          <div className="player" key={userQueue.currently_playing.id}>
            <div className="img">
              <img src={userQueue.currently_playing.album.images[1].url} />
            </div>
            <div className="title">
              <p>{userQueue.currently_playing.name}</p>
              <span className="artist">
                {userQueue.currently_playing.artists[0].name}
              </span>
            </div>
          </div>
        ) : (
          <div>재생중인 음악 없음</div>
        )}
        <div className="container__button">
          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack();
            }}
          >
            <SkipPreviousIcon />
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.togglePlay();
            }}
          >
            {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack();
              refetchQueue();
            }}
          >
            <SkipNextIcon />
          </button>
        </div>
      </div>
      <div className="container__queue">
        <ul className="list__queue">
          {userQueue?.queue?.map((elem: any, idx: number) => (
            <li key={elem.id + idx.toString()}>
              <img src={elem.album.images[2].url} />
              <div className="title">
                <p>{elem.name}</p>
                <span className="artist">{elem.artists[0].name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Playback;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .container__playlist {
    // height: 100%;
  }

  .list__playlists {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .list__playlists li {
    list-style: none;
    padding: 10px 15px;
    width: 200px;
    font-size: 13px;
    border-radius: 10px;
  }

  .list__playlists li.selected {
    background: #542ad2;
    font-weight: 500;
    color: white;
  }

  .player .title p {
    font-size: 20px;
    font-weight: 500;
  }

  .container__button {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .container__button button {
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid gray;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .container__button button:hover {
    transform: scale(1.1);
    transition: transform 0.1s;
  }

  .list__playlist {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 30px;
    max-width: 450px;
  }

  .list__playlist li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list__playlist li .container__track-left {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .list__playlist li .container__track-left > img {
    border-radius: 10px;
  }

  .container__queue {
    width: 500px;
    max-height: 600px;
    border-radius: 50px;
    overflow-y: scroll;
  }

  .list__queue {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
  }

  .list__queue li {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
  }

  .list__queue li .title {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .list__queue li p {
    font-size: 13px;
    font-weight: 500;
    margin: 0;
  }

  .list__queue li .artist {
    font-size: 10px;
    color: gray;
  }

  .list__queue li img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  .list__queue li .img {
    position: relative;
    width: 30px;
    height: 30px;
  }

  .list__queue li.current {
    background: rgba(0, 0, 0, 0.2);
  }

  .list__queue li.current .img::after {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: block;
    content: "";
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    border-left: 10px solid white;
    border-right: 10px solid transparent;
  }
`;
