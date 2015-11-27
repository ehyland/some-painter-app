import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Actions from "../constants/Actions";
import ListUtils from "../utils/ListUtils";

class GalleryStore extends BaseStore {

  static storeName = "GalleryStore";

  static handlers = {
    [Actions.LOAD_EVENTS_SUCCESS]: "handleReceiveGalleries"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.galleries = Immutable.List([]);
  }

  /**
   * Dispatch handlers
   */
  handleReceiveGalleries ({galleries=[]}) {
    galleries.forEach(gallery => {
      this.galleries = ListUtils.listAddOrReplaceByID(this.galleries, gallery);
    });
    this.emitChange();
  }

  /**
   * Getters
   */
  getGalleries () {
    return this.galleries.toJS();
  }

  getGalleryByID (id) {
    return this.galleries.find(gallery => gallery.ID === id);
  }

  /**
   * Transferring state
   */
  dehydrate () {
    return {
      galleries: this.galleries.toJS()
    };
  }

  rehydrate (state) {
    this.galleries = Immutable.List(state.galleries);
  }
}

export default GalleryStore;
