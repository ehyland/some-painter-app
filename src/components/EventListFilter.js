import React, {Component, PropTypes} from "react";
import {NavLink} from "fluxible-router";
import moment from "moment-timezone";
import classNames from "classnames";

class EventListFilter extends Component {
  render() {
    const date = moment.tz("Australia/Melbourne");
    const {currentRoute} = this.props;

    return (
      <div className="EventListFilter">
        <EventListFilterBtn label="Tonight" momentDate={date} forceActive={currentRoute.name === "home"}/>
        <EventListFilterBtn label="Tomorrow" momentDate={date.clone().add(1, "days")}/>
        <EventListFilterBtn label="Next Day" momentDate={date.clone().add(2, "days")}/>
        <EventListFilterBtn label="Day After" momentDate={date.clone().add(3, "days")}/>
      </div>
    );
  }
}

class EventListFilterBtn extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    momentDate: PropTypes.object.isRequired
  }

  render() {
    const {label, momentDate, forceActive} = this.props;
    const navParams = {
      date: momentDate.format("YYYY-MM-DD")
    };
    const className = classNames({
      "EventListFilterBtn": true,
      "active": forceActive
    });

    return (
      <NavLink
        className={className}
        routeName="events"
        navParams={navParams}
      >
        <div className="EventListFilterBtn-label">
          {label}
        </div>
        <div className="EventListFilterBtn-date">{momentDate.format("ddd D")}</div>
      </NavLink>
    );
  }
}

export default EventListFilter;
