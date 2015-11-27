import PageInitActions from "./actions/PageInitActions";
import EventsListingPage from "./containers/EventsListingPage";

export default {
  home: {
    path: "/",
    method: "get",
    handler: EventsListingPage,
    action: PageInitActions.eventsListingPage
  },
  events: {
    path: "/events/:date",
    method: "get",
    handler: EventsListingPage,
    action: PageInitActions.eventsListingPage
  }
};
