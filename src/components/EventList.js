import React, {PropTypes, Component} from "react";
import classNames from "classnames";
import ListEvent from "./ListEvent";
import moment from "moment-timezone";

class EventList extends Component {

  packageEvents () {
    const {events, galleries, locations} = this.props;

    // Parse for ListEvent.
    // Filter out events with missing location or gallery
    return events
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
  }

  renderNoEventsView () {
    const {appConfig, eventsFilterDate} = this.props;
    const {noEventsMessages, noEventsFormURL} = appConfig;
    const now = moment.tz("Australia/Melbourne");
    const searchOffset = moment(eventsFilterDate).diff(now, "days")

    let message;
    let extraContent = null;

    // If in past
    if (searchOffset < 0) {
      message = "No events back here. Why not try tonights events?"
    }

    // If custom message set
    else if (noEventsMessages[searchOffset]) {
      message = noEventsMessages[searchOffset];
    }

    // If no custom message
    else {
      message = noEventsMessages[noEventsMessages.length - 1];
    }

    // If last message add form
    if (searchOffset >= (noEventsMessages.length - 1)) {
      extraContent = (
        <p>
          To help us improve can you answer this one question <a className="u-hightlited" href={noEventsFormURL} target="_blank">this one question</a>?
        </p>
      );
    }


    return (
      <div className="ListEvent-noEventsView">
        <p>{message}</p>
        {extraContent}
      </div>
    );
  }

  renderStatusMessage (events) {
    const {eventsLoadingStatus, isNavigateComplete} = this.props;
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
      return this.renderNoEventsView();
    }
    else if (!isNavigateComplete || eventsLoadingStatus === "LOADING") {
      return <p>Loading events</p>
    }
  }

  renderList (events) {
    return events.map(({event, gallery, location}) => (
      <ListEvent {...this.props}
        key={event.ID}
        event={event}
        gallery={gallery}
        location={location} />
    ));
  }

  render () {
    const packagedEvents = this.packageEvents();
    const statusMessage = this.renderStatusMessage(packagedEvents);
    const listContent = this.renderList(packagedEvents);

    return (
      <section className="EventList">
        {statusMessage}
        {listContent}
      </section>
    );
  }
}

export default EventList;
