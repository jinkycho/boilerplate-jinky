const express = require("express");
const dotenv = require("dotenv");
const request = require("request");
const next = require("next");
import { createServer } from "http";
const { parse } = require("url");
import { URLSearchParams } from "url";

import { Response, Request } from "express";

const port = 3001;

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = "http://localhost:3000/auth/callback";

const generateRandomString = function (length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const dev = true;
const app = next({ dev, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/auth/login", (req: Request, res: Response) => {
    const scope = "streaming user-read-email user-read-private";

    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: "187806a5c91740edbc79d2ddd4c5993e",
      scope: scope,
      redirect_uri: "http://localhost:3000/auth/callback",
      state: state,
    });

    res.redirect(
      "https://accounts.spotify.com/authorize/?" +
        auth_query_parameters.toString()
    );
  });

  server.get("/auth/callback", (req: Request, res: Response) => {
    const code = req.query.code;

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    };

    //request.post(authOptions, function (req: Request, res: Response, body) {
    //  if (!error && response.statusCode === 200) {
    //    const access_token = body.access_token;
    //    res.redirect("/");
    //  }
    //});
  });

  //server.get("/auth/token", (req: Request, res: Response) => {
  //  res.json({
  //    access_token: access_token,
  //  });
  //});
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});

//app.prepare().then(() => {
//  createServer(async (req, res) => {
//    try {
//      // Be sure to pass `true` as the second argument to `url.parse`.
//      // This tells it to parse the query portion of the URL.
//      const parsedUrl = parse(req.url, true);
//      const { pathname, query } = parsedUrl;

//      if (pathname === "/auth/login") {
//        await app.render(req, res, pathname, () => {
//          const scope = "streaming user-read-email user-read-private";

//          const state = generateRandomString(16);

//          const auth_query_parameters = new URLSearchParams({
//            response_type: "code",
//            client_id: spotify_client_id,
//            scope: scope,
//            redirect_uri: "http://localhost:3000/auth/callback",
//            state: state,
//          });
//           res.redirect(
//             "https://accounts.spotify.com/authorize/?" +
//               auth_query_parameters.toString()
//           );
//        });
//      } else if (pathname === "/b") {
//        await app.render(req, res, "/b", query);
//      } else {
//        await handle(req, res, parsedUrl);
//      }
//    } catch (err) {
//      console.error("Error occurred handling", req.url, err);
//      res.statusCode = 500;
//      res.end("internal server error");
//    }
//  })
//    .once("error", (err) => {
//      console.error(err);
//      process.exit(1);
//    })
//    .listen(port, () => {
//      console.log(`> Ready on http://localhost:${port}`);
//    });
//});
