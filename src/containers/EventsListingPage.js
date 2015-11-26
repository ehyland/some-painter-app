import React, {Component, PropTypes} from "react";
import { connectToStores } from "fluxible-addons-react";

import EventList from "../components/EventList";

@connectToStores(["EventStore", "GalleryStore"], context =>
  ({
    searchDayString: context.getStore("EventStore").getSearchDayString(),
    events: context.getStore("EventStore").getEvents(),
    galleries: context.getStore("GalleryStore").getGalleries()
  })
)
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
