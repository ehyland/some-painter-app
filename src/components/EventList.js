import React, {PropTypes, Component} from "react";
import EventListFilter from "./EventListFilter";
import ListEvent from "./ListEvent";

class EventList extends Component {

  renderEvents() {
    const {events, filterDay} = this.props;
    const filteredEvents = events.filter(event => event.Date === filterDay)

    if (filteredEvents.length) {
      return filteredEvents.map(event => (
        <ListEvent key={event.ID} {...this.props} event={event} />
      ));
    }else {
      return <p>No events...</p>
    }


  }

  render() {
    const list = this.renderEvents();
    return (
      <section className="EventList">
        <EventListFilter {...this.props}/>
        {list}
      </section>
    );
  }
}

export default EventList;
