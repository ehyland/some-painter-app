import React, {PropTypes, Component} from "react";

class ListEvent extends Component {

  renderIncomplete() {
    return <p>Event data missing</p>
  }

  renderMapLink (gallery, location) {
    const {StreetNumber, Route, Suburb, State, Country, PostalCode, Latitude, Longitude} = location;

    let keyword = gallery.Title || `${StreetNumber} ${Route} ${Suburb} ${State} ${Country} ${PostalCode}`;
    keyword = encodeURI(keyword.replace(/\s/g, "+"));
    const positioning = `@${Latitude},${Longitude},z15`;
    const href = `https://maps.google.com/maps/search/${keyword}/${positioning}`;

    return (
      <a href={href} target="_blank" className="ListEvent-location">
        <div>{gallery.Title}</div>
        <div>{StreetNumber} {Route} {Suburb}</div>
      </a>
    );
  }

  render() {

    const {event, galleries, locations} = this.props;
    let gallery, location;

    try {
      gallery = galleries.find(gallery => gallery.ID === event.GalleryID);
      location = locations.find(location => location.ID === gallery.LocationID);
    } catch (e) {
      return this.renderIncomplete();
    }

    const locationContent = this.renderMapLink(gallery, location);

    return (
      <article className="ListEvent">
        <div className="ListEvent-title">
          <span className="ListEvent-galleryName">{gallery.Title}</span>
          /
          <span className="ListEvent-suburb">{location.Suburb}</span>
        </div>
        {locationContent}
        <div className="ListEvent-time">{event.MelbStartTime}</div>
      </article>
    );
  }
}

export default ListEvent;
