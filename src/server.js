/*eslint no-console: 0*/

import path from "path";
import express from "express";
import serveStatic from "serve-static";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import render from "./render";
import app from "./app";
import CMSService from "./services/CMSService";
const debug = require("debug")("painter:server");

const env = process.env.NODE_ENV || "development";
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

const staticPath = path.resolve(__dirname, "../static");

// Setup express server
const server = express();
server.set("env", env);
server.set("host", host);
server.set("port", port);

server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(csurf({ cookie: true }));

// Configure fetchr
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(CMSService);
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

// Static files
server.use("/static", serveStatic(staticPath, {
  maxAge: 365 * 24 * 60 * 60
}));

// Render pages
server.use(render);

server.listen(port, function () {
  console.log(`Example app listening at http://${host}:${port}`);
});
