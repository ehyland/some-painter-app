import React, {PropTypes, Component} from "react";

class ListEvent extends Component {
  render() {

    const {event, galleries, locations} = this.props;
    let gallery, location;

    try {
      gallery = galleries.find(gallery => gallery.ID === event.GalleryID);
      location = locations.find(location => location.ID === gallery.LocationID);
    } catch (e) {
      return renderIncomplete();
    }

    return (
      <article className="ListEvent">
        <div className="ListEvent-title">
          <span className="ListEvent-galleryName">{gallery.Title}</span>
          /
          <span className="ListEvent-suburb">{location.Suburb}</span>
        </div>
        <div className="ListEvent-summary">
          <div className="ListEvent-artist">{gallery.Title}</div>
          <div className="ListEvent-location">{`${location.StreetNumber} ${location.Route} ${location.Suburb}`}</div>
        </div>
        <div className="ListEvent-time">{event.MelbStartTime}</div>
      </article>
    );
  }

  renderIncomplete() {
    return <p>loading...</p>
  }
}

export default ListEvent;
