import React, {PropTypes, Component} from "react";
import ListEvent from "./ListEvent";

class EventList extends Component {

  render() {
    const {events, galleries} = this.props;
    return (
      <section className="EventList">
        <div className="EventList-header">
          <h2>TONIGHT</h2>
          <div className="Date">Thu 26</div>
        </div>

        {events.map(event =>
          <ListEvent key={event.ID} event={event} gallery={galleries.find(gallery => gallery.ID === event.GalleryID)}/>
        )}

      </section>
    );
  }
}

export default EventList;
