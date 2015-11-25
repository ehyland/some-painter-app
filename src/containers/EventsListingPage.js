import React, {Component, PropTypes} from "react";
import { connectToStores } from "fluxible-addons-react";

@connectToStores(["EventStore", "GalleryStore"], context =>
  ({
    events: context.getStore("EventStore").getEvents(),
    galleries: context.getStore("GalleryStore").getGalleries()
  })
)
class EventsListingPage extends Component {
  static propTypes = {}
  render() {
    return (
      <div className="EventsListingPage">
        <h1>Events</h1>
        <ul>
          {this.props.events.map((event) => <li key={event.ID}>{`${event.ID}::${event.Title}`}</li> )}
        </ul>
        <h1>Galleries</h1>
        <ul>
          {this.props.galleries.map((gallery) => <li key={gallery.ID}>{`${gallery.ID}::${gallery.Title}`}</li> )}
        </ul>
      </div>
    );
  }
}

export default EventsListingPage;
