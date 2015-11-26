import BaseStore from "fluxible/addons/BaseStore";
import Actions from "../constants/Actions";

class EventStore extends BaseStore {

  static storeName = "EventStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveEvents",
    [Actions.UPDATE_SEARCH_DAY]: "handleUpdateSearchDay"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.events = [];
    this.searchDayString = "Loading..."
  }

  handleReceiveEvents ({events=[]}) {
    this.events = events;
    this.emitChange();
  }

  handleUpdateSearchDay (searchDayString) {
    this.searchDayString = searchDayString;
    this.emitChange();
  }

  getSearchDayString () {
    return this.searchDayString;
  }

  getEvents () {
    return this.events;
  }

  getEventByID (id) {
    return this.events.find(event => event.ID === id);
  }

  // For sending state to the client
  dehydrate () {
    return {
      events: this.events,
      searchDayString: this.searchDayString
    };
  }

  // For rehydrating server state
  rehydrate (state) {
    this.events = state.events;
    this.searchDayString = state.searchDayString;
  }
}

export default EventStore;
