import React, {PropTypes, Component} from "react";
import EventListFilter from "./EventListFilter";
import ListEvent from "./ListEvent";

class EventList extends Component {

  render() {
    const {searchDayString, events, galleries} = this.props;
    return (
      <section className="EventList">
        <EventListFilter/>
        {events.map(event =>
          <ListEvent key={event.ID} event={event} gallery={galleries.find(gallery => gallery.ID === event.GalleryID)}/>
        )}
      </section>
    );
  }
}

export default EventList;
