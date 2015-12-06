import React, {PropTypes, Component} from "react";
import classNames from "classnames";
import ListEvent from "./ListEvent";

class EventList extends Component {

  renderStatusMessage () {
    const {eventsLoadingStatus, events, isNavigateComplete} = this.props;
    let message;

    if (events.length && eventsLoadingStatus !== "ERROR") {
      // Dont't display loading message if there are some events listed
      // Will update this when a better loading indicator has been designed
      return;
    }
    if (isNavigateComplete && eventsLoadingStatus === "ERROR") {
      return <p>Error loading event</p>
    }
    else if (isNavigateComplete && !events.length) {
      return <p>No events</p>
    }
    else if (!isNavigateComplete || eventsLoadingStatus === "LOADING") {
      return <p>Loading events</p>
    }
  }

  render () {
    const {events, galleries, locations} = this.props;

    // parse for ListEvent.
    // Filter out events with missing location or gallery
    const packagedEvents = events
      .map(event => {
        let gallery, location;

        // check gallery
        if (!(gallery = galleries.find(testGal => testGal.ID === event.GalleryID))) {
          return false;
        }

        // check location
        if (!(location = locations.find(testLoc => testLoc.ID === gallery.LocationID))) {
          return false;
        }

        // All good
        return {
          event: event,
          gallery: gallery,
          location: location
        };
      })
      .filter(packagedEvent => packagedEvent !== false);

    const statusMessage = this.renderStatusMessage();

    return (
      <section className="EventList">
        <div className={classNames({"EventList-statusMesage": true, "active": statusMessage})}>
          {statusMessage}
        </div>
        {packagedEvents.map(({event, gallery, location}) => (
          <ListEvent {...this.props}
            key={event.ID}
            event={event}
            gallery={gallery}
            location={location} />
        ))}
      </section>
    );
  }
}

export default EventList;
