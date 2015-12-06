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
    this.config = {
      siteTitle: "",
      metaDescription: "",
      metaKeywords: "",
      noEventsMessages: ["No Events"],
      noEventsFormURL: ""
    };
  }

  /**
   * Dispatch handlers
   */
  handleReceiveAppConfig ({DefaultSiteTitle = "", DefaultMetaDescription = "", DefaultMetaKeywords = "", NoEventsMessages = "", NoEventsFormURL = ""}) {

    this.configFetched = true;

    this.config.siteTitle = DefaultSiteTitle,
    this.config.metaDescription = DefaultMetaDescription,
    this.config.metaKeywords = DefaultMetaKeywords,
    this.config.noEventsMessages = NoEventsMessages.split("\n"),
    this.config.noEventsFormURL = NoEventsFormURL

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
