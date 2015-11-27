import React, {Component, PropTypes} from "react";
import {NavLink} from "fluxible-router";
import moment from "moment-timezone";
import classNames from "classnames";

class EventListFilter extends Component {
  render() {
    const date = moment.tz("Australia/Melbourne");
    return (
      <div className="EventListFilter">
        <EventListFilterBtn label="Tonight" momentCurrentDate={date} momentDate={date}/>
        <EventListFilterBtn label="Tomorrow" momentCurrentDate={date} momentDate={date.clone().add(1, "days")}/>
        <EventListFilterBtn label="Next Day" momentCurrentDate={date} momentDate={date.clone().add(2, "days")}/>
        <EventListFilterBtn label="Day After" momentCurrentDate={date} momentDate={date.clone().add(3, "days")}/>
      </div>
    );
  }
}

class EventListFilterBtn extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    momentDate: PropTypes.object.isRequired,
    momentCurrentDate: PropTypes.object.isRequired
  }

  render() {
    const {label, momentDate, momentCurrentDate} = this.props;
    const navParams = {
      date: momentDate.format("YYYY-MM-DD")
    };
    const className = classNames({
      "EventListFilter-btn": true,
      "active": momentDate === momentCurrentDate
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
