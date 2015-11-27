import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Actions from "../constants/Actions";

class EventStore extends BaseStore {

  static storeName = "EventStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveEvents"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.events = Immutable.List([]);
  }

  /**
   * Dispatch handlers
   */
  handleReceiveEvents ({searchDate, events=[]}) {
    this.events = this.events
      .filter(event => event.Date !== searchDate) // Remove all for search date
      .concat(events)
      .sortBy(event => event.StartDate); // Add new events
    this.emitChange();
  }

  /**
   * Getters
   */
  getEvents () {
    return this.events.toJS();
  }

  getEventByID (id) {
    return this.events.find(event => event.ID === id);
  }

  /**
   * Transferring state
   */
  dehydrate () {
    return {
      events: this.events.toJS()
    };
  }

  rehydrate (state) {
    this.events = Immutable.List(state.events);
  }
}

export default EventStore;
