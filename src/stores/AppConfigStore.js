import BaseStore from "fluxible/addons/BaseStore";
import Actions from "../constants/Actions";

class AppConfigStore extends BaseStore {

  static storeName = "AppConfigStore";

  static handlers = {
    [Actions.LOAD_APP_CONFIG_SUCCESS]: "handleReceiveAppConfig"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.configFetched = false;
    this.config = {};
  }

  /**
   * Dispatch handlers
   */
  handleReceiveAppConfig (payload) {
    this.configFetched = true;
    this.config = payload;
    this.emitChange();
  }

  /**
   * Getters
   */
  getConfig () {
    return this.config;
  }

  hasConfigBeenFetched () {
    return this.configFetched;
  }

  /**
   * Transferring state
   */
  dehydrate () {
    return {
      configFetched: this.configFetched,
      config: this.config
    };
  }

  rehydrate (state) {
    this.configFetched = state.configFetched;
    this.config = state.config;
  }
}

export default AppConfigStore;
