import Actions from "../constants/Actions";
const debug = require("debug")("painter:actions");

export default {
  loadEventDataForDay (context, { params }, done) {
    context.dispatch(Actions.LOAD_EVENTS_START, {});
    const date = params.date || "";

    context.service.read("cms", {endPoint: `events/${date}`}, (err, res) => {
      if (err) {
        context.dispatch(Actions.LOAD_EVENTS_FAILED, {});
        debug("Error getting events", err);
      }else {

        // Inject searchDate
        res.body.collections.searchDate = res.body.searchDate;

        context.dispatch(Actions.LOAD_EVENTS_SUCCESS, res.body.collections);
      }
      done();
    });
  }
};
