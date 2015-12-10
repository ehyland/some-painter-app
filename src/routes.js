import PageInitActions from "./actions/PageInitActions";
import EventsListingPage from "./containers/EventsListingPage";
import ThankYouPage from "./containers/ThankYouPage";

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
  },
  thankYou: {
    path: "/thank-you/:thanksFor",
    method: "get",
    handler: ThankYouPage,
    action: PageInitActions.eventsListingPage
  }
};
