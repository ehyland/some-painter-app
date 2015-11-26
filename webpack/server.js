import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "./dev.config";

const host = process.env.HOST || "0.0.0.0";
const port = (process.env.PORT + 1) || 3001;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {hot: true});

server.listen(port);
