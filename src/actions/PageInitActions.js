import Actions from "../constants/Actions";
import CMSActions from "./CMSActions";
const debug = require("debug")("painter:actions");

export default {

  // Events Listing Page
  eventsListingPage: function(context, payload, done) {
    context.executeAction(CMSActions.loadEventDataForDay, payload, done);
  }
  
};
