import PageLoadActions from "./actions/PageLoadActions";
import EventsListingPage from "./containers/EventsListingPage";

export default {
  events: {
    path: "/",
    method: "get",
    handler: EventsListingPage,
    action: PageLoadActions.eventsListingPage
  }
};
