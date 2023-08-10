import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useMutation, useQuery } from "react-query";
import { GetAccessToken } from "../api/spotify";

import queryString from "query-string";
import Playback from "./Playback";

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const index = () => {
  //useEffect(() => {
  //  async function getToken() {
  //    const response = await fetch("/auth/token");
  //    const json = await response.json();
  //    setToken(json.access_token);
  //  }

  //  getToken();
  //}, []);

  function generateRandomString(length: number) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier: string) {
    function base64encode(string: any) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
  }

  useEffect(() => {
    const codeVerifier = generateRandomString(128);
    const win: Window = window;

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);
      const scope =
        "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state";

      localStorage.setItem("code_verifier", codeVerifier);
      console.log("win", win);

      const args = queryString.stringify({
        response_type: "code",
        client_id: "187806a5c91740edbc79d2ddd4c5993e",
        scope: scope,
        redirect_uri: `http://localhost:3000/spotify/verified`,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      //const args = new URLSearchParams({
      //  response_type: "code",
      //  client_id: "187806a5c91740edbc79d2ddd4c5993e",
      //  scope: scope,
      //  redirect_uri: "http://localhost:3000",
      //  state: state,
      //  code_challenge_method: "S256",
      //  code_challenge: codeChallenge,
      //});

      win.location = "https://accounts.spotify.com/authorize?" + args;
      console.log("win", win.location.search);
    });
  }, []);

  return (
    <div>
      <a href="/auth/login">토큰 가져오기</a>
    </div>
  );
};

export default index;
