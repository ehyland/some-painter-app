import React, {PropTypes, Component} from "react";
import EventListFilter from "./EventListFilter";
import ListEvent from "./ListEvent";

class EventList extends Component {

  renderEvents () {
    const {events, isNavigateComplete} = this.props;

    if (events.length) {
      return events.map(event => (
        <ListEvent {...this.props} key={event.ID} event={event} />
      ));
    }else if (isNavigateComplete) {
      return <p>No events...</p>;
    }
  }

  renderStatusMessage () {
    const {eventsLoadingStatus} = this.props;
    if (eventsLoadingStatus === "LOADED") {
      return null;
    }
    else if (eventsLoadingStatus === "LOADING") {
      return <p>Loading...</p>;
    }
    else {
      return <p>Error loading events...</p>;
    }
  }

  render () {
    return (
      <section className="EventList">
        <EventListFilter {...this.props}/>
        {this.renderStatusMessage()}
        {this.renderEvents()}
      </section>
    );
  }
}

export default EventList;
