import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Actions from "../constants/Actions";

class EventStore extends BaseStore {

  static storeName = "EventStore";

  static handlers = {
    [Actions.LOAD_EVENTS_START]: "handleReceiveEvents",
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveEvents",
    [Actions.LOAD_EVENTS_FAILED]: "handleReceiveEvents"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.events = Immutable.List([]);
    this.loadingStatus = Immutable.Map({}); // Can be LOADING|LOADED|ERROR for each search day
  }

  /**
   * Dispatch handlers
   */
  handleReceiveEvents ({searchDate, status="ERROR", events=[]}) {
    this.loadingStatus = this.loadingStatus.set(searchDate, status);

    if (status === "LOADED") {
      this.events = this.events
        .filter(event => event.Date !== searchDate) // Remove all for search date
        .concat(events)
        .sortBy(event => event.StartDate); // Add new events
    }

    this.emitChange();
  }

  /**
   * Getters
   */
  getEvents () {
    return this.events.toJS();
  }

  getEventsForDate (date) {
    return this.events.filter(event => event.Date === date).toJS();
  }

  getEventByID (id) {
    return this.events.find(event => event.ID === id);
  }

  getLoadingStatusForDate (date) {
    return this.loadingStatus.get(date) || "ERROR";
  }

  /**
   * Transferring state
   */
  dehydrate () {
    return {
      events: this.events.toJS(),
      loadingStatus: this.loadingStatus.toJS()
    };
  }

  rehydrate (state) {
    this.events = Immutable.List(state.events);
    this.loadingStatus = Immutable.Map(state.loadingStatus);
  }
}

export default EventStore;
