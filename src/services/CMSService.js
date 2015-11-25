import { get } from "../utils/CMSUtil";

// Fetchr service to load a photo given an id.

export default {
  name: "cms",

  read(req, resource, {endPoint}, config, done) {
    get(endPoint, {}, done);
  }

};
