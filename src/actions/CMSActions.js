import moment from "moment-timezone";
import Actions from "../constants/Actions";
const debug = require("debug")("painter:actions");

export default {
  loadEventDataForDay (context, { params }, done) {

    // Get Search Date
    const searchDate = params.date || moment.tz("Australia/Melbourne").format("YYYY-MM-DD");

    // Get endPoint url
    let endPoint = `events/${searchDate}`;
    if (!context.getStore("AppConfigStore").hasConfigBeenFetched()) {
      endPoint += "/getconfig";
    }

    // Dispatch start action
    context.dispatch(Actions.LOAD_EVENTS_START, {searchDate: searchDate, status: "LOADING"});

    context.service.read("cms", {endPoint: endPoint}, (err, res) => {
      if (err) {
        context.dispatch(Actions.LOAD_EVENTS_FAILED, {searchDate: searchDate, status: "ERROR"});
        debug("Error getting events", err);
      }else {

        // Check if app config was returned
        if (res.body.appConfig) {
          context.dispatch(Actions.LOAD_APP_CONFIG_SUCCESS, res.body.appConfig);
        }

        // Inject searchDate and status
        res.body.collections.status = "LOADED";
        res.body.collections.searchDate = searchDate;

        context.dispatch(Actions.LOAD_EVENTS_SUCCESS, res.body.collections);
      }
      done();
    });
  }
};
