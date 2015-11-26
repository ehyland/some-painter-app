import React, {PropTypes, Component} from "react";

class ListEvent extends Component {
  render() {
    const {event, gallery} = this.props;
    const {StreetNumber, Route, Suburb} = gallery.Location;
    return (
      <article className="ListEvent">
        <div className="ListEvent-title">
          <span className="ListEvent-galleryName">{gallery.Title}</span> / <span className="ListEvent-suburb">{gallery.Location.Suburb}</span>
        </div>
        <div className="ListEvent-summary">
          <div className="ListEvent-artist">{gallery.Title}</div>
          <div className="ListEvent-location">{`${StreetNumber} ${Route} ${Suburb}`}</div>
        </div>
        <div className="ListEvent-time">{event.MelbStartTime}</div>
      </article>
    );
  }
}

export default ListEvent;
