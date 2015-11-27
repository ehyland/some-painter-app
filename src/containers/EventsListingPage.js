import React, {Component, PropTypes} from "react";
import moment from "moment-timezone";
import { connectToStores } from "fluxible-addons-react";

import EventList from "../components/EventList";

@connectToStores(["EventStore", "GalleryStore", "LocationStore"], context => {
  const eventStore = context.getStore("EventStore");
  const params = context.getStore("RouteStore").getCurrentRoute().params;
  const date = params.date || moment.tz("Australia/Melbourne").format("YYYY-MM-DD");
  return {
    events: eventStore.getEventsForDate(date),
    eventsLoadingStatus: eventStore.getLoadingStatusForDate(date),
    galleries: context.getStore("GalleryStore").getGalleries(),
    locations: context.getStore("LocationStore").getLocations()
  };
})
class EventsListingPage extends Component {
  static propTypes = {}
  render() {
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-5 col-lg-4">
              <h1 className="Page-title">Art Gallery Openings In Melbourne</h1>
            </div>
            <div className="col-md-offset-0 col-md-7 col-lg-8 col-sm-offset-1 col-sm-6">
              <EventList {...this.props}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default EventsListingPage;
