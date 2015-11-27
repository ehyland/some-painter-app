import Actions from "../constants/Actions";
const debug = require("debug")("painter:actions");

export default {

  // Events Listing Page
  eventsListingPage: function(context, { params }, done) {
    context.dispatch(Actions.LOAD_EVENTS_START, {});
    const date = params.date || "";

    context.service.read("cms", {endPoint: `events/${date}`}, (err, res) => {
      if (err) {
        context.dispatch(Actions.LOAD_EVENTS_FAILED, {});
        debug("Error getting events", err);
      }else {
        const {galleries, events} = res.body.collections;

        context.dispatch(Actions.LOAD_EVENTS_SUCCESS, {
          searchDate: res.body.searchDate,
          galleries: galleries,
          events: events
        });
      }
      done();
    });
  }
};
