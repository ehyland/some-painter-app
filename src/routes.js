import PageLoadActions from "./actions/PageLoadActions";
import EventsListingPage from "./containers/EventsListingPage";

export default {
  home: {
    path: "/",
    method: "get",
    handler: EventsListingPage,
    action: PageLoadActions.eventsListingPage
  },
  events: {
    path: "/events/:date",
    method: "get",
    handler: EventsListingPage,
    action: PageLoadActions.eventsListingPage
  }
};
