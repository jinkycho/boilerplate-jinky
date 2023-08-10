import React, { useEffect, useState } from "react";
import queryString from "query-string";

import { useRouter } from "next/router";

import Playback from "./Playback";

const verified = () => {
  const router = useRouter();
  const query = router.query;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (Object.keys(query).length === 0) return;
    function generateRandomString(length: number) {
      let text = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    const code = query.code;
    const codeVerifier = localStorage.getItem("code_verifier");

    const body = queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/spotify/verified",
      client_id: "187806a5c91740edbc79d2ddd4c5993e",
      code_verifier: codeVerifier,
    });

    const response = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("response", response);
  }, [query]);

  return <div>{token && <Playback token={token} />}</div>;
};

export default verified;
