import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import render from "./render";
import app from "./app";
const debug = require("debug")("painter:server");

const env = process.env.NODE_ENV || "development";
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

// Setup express server
const server = express();
server.set("env", env);
server.set("host", host);
server.set("port", port);

server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(csurf({ cookie: true }));
server.use(render);

server.listen(port, function () {
  debug(`Example app listening at http://${host}:${port}`);
});
