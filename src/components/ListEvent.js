import React, {PropTypes, Component} from "react";

class ListEvent extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
    gallery: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  renderIncomplete() {
    return <p>Event data missing</p>
  }

  renderTitle (gallery, location) {

    let galleryTitleEl, elType;
    const propsObj = {
      className: "ListEvent-galleryName",
      target: "_blank"
    };

    if (gallery.WebsiteURL) {
      elType = "a";
      propsObj.href = gallery.WebsiteURL;
    }else {
      elType = "span";
    }

    galleryTitleEl = React.createElement(elType, propsObj, gallery.Title);

    return (
        <div className="ListEvent-title">
          {galleryTitleEl}
          /
          <span className="ListEvent-suburb">{location.Suburb}</span>
        </div>
    );
  }

  renderLocation (gallery, location) {
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
    const {event, gallery, location} = this.props;
    return (
      <article className="ListEvent">
        {this.renderTitle(gallery, location)}
        {this.renderLocation(gallery, location)}
        <div className="ListEvent-time">{event.MelbStartTime}</div>
      </article>
    );
  }
}

export default ListEvent;
