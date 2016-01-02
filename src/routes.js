import PageInitActions from "./actions/PageInitActions";
import EventsListingPage from "./containers/EventsListingPage";
import ThankYouPage from "./containers/ThankYouPage";
import FormPage from "./containers/FormPage";

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
  },
  submitEvent: {
    path: "/f/submit-event",
    method: "get",
    handler: FormPage,
    action: PageInitActions.eventsListingPage
  }
};
