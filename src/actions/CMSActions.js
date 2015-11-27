import moment from "moment-timezone";
import Actions from "../constants/Actions";
const debug = require("debug")("painter:actions");

export default {
  loadEventDataForDay (context, { params }, done) {

    const searchDate = params.date || moment.tz("Australia/Melbourne").format("YYYY-MM-DD");
    context.dispatch(Actions.LOAD_EVENTS_START, {searchDate: searchDate, status: "LOADING"});

    context.service.read("cms", {endPoint: `events/${searchDate}`}, (err, res) => {
      if (err) {
        context.dispatch(Actions.LOAD_EVENTS_FAILED, {searchDate: searchDate, status: "ERROR"});
        debug("Error getting events", err);
      }else {

        // Inject searchDate and status
        res.body.collections.status = "LOADED";
        res.body.collections.searchDate = searchDate;

        context.dispatch(Actions.LOAD_EVENTS_SUCCESS, res.body.collections);
      }
      done();
    });
  }
};
