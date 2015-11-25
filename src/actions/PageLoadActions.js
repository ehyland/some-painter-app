import Actions from "../constants/Actions";
const debug = require("debug")("painter:actions");

export default {

  // Events Listing Page
  eventsListingPage: function(context, payload, done) {
    context.dispatch(Actions.LOAD_EVENTS_START, {});

    context.service.read("cms", {endPoint: "events/"}, (err, res) => {
      if (err) {
        context.dispatch(Actions.LOAD_EVENTS_FAILED, {});
        debug("Error getting events", err);
      }else {
        context.dispatch(Actions.LOAD_EVENTS_SUCCESS, res.body.collections);
      }
      done();
    });
  }
};
