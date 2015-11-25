import BaseStore from "fluxible/addons/BaseStore";
import Actions from "../constants/Actions";

class EventStore extends BaseStore {

  static storeName = "EventStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveEvents"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.events = [];
  }

  handleReceiveEvents ({events=[]}) {
    this.events = events;
    this.emitChange();
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
      events: this.events
    };
  }

  // For rehydrating server state
  rehydrate (state) {
    this.events = state.events;
  }
}

export default EventStore;
