import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Actions from "../constants/Actions";
import ListUtils from "../utils/ListUtils";

class LocationStore extends BaseStore {

  static storeName = "LocationStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveLocations"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.locations = Immutable.List([]);
  }

  /**
   * Dispatch handlers
   */
   handleReceiveLocations ({locations=[]}) {
     locations.forEach(location => {
       this.locations = ListUtils.listAddOrReplaceByID(this.locations, location);
     });
     this.emitChange();
   }

  /**
   * Getters
   */
  getLocations () {
    return this.locations.toJS();
  }

  /**
   * Transferring state
   */
  dehydrate () {
    return {
      locations: this.locations.toJS()
    };
  }

  rehydrate (state) {
    this.locations = Immutable.List(state.locations);
  }
}

export default LocationStore;
