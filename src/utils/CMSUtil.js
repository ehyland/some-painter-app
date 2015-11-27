/**
 * To be used server-side only
 */
import request from "superagent";
import config from "../config";
const debug = require("debug")("painter:cms-util")

const {baseURL, apiPath} = config.cms;

export default {
  get(endPoint, query={}, done=() => {}) {
    const url = `${baseURL}${apiPath}${endPoint}`;
    request
      .get(url)
      .query(query)
      .end((err, res) => {
        if (err) {
          debug(`Error making request to ${url}`, err);
          done(err);
        }else {
          done(err, {status: res.status, body: res.body});
        }
      });
  }
};
