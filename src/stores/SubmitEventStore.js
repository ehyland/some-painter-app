import BaseStore from "fluxible/addons/BaseStore";
import Actions from "../constants/Actions";

class SubmitEventStore extends BaseStore {

  static storeName = "SubmitEventStore";
  static handlers = {
    [Actions.SUBMIT_EVENT_FORM_FIELD_UPDATE]: "handleUpdateField",
    [Actions.SUBMIT_EVENT_FORM_START]: "handleSubmissionStart",
    [Actions.SUBMIT_EVENT_FORM_SUCCESS]: "handleSubmissionSuccess",
    [Actions.SUBMIT_EVENT_FORM_FAILED]: "handleSubmissionFailed"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.isSubmitting = false;
    this.messages = [];
    this.inputs = [
      {
        type: "text",
        label: "Gallery",
        name: "UserSubmittedGallery",
        value: ""
      },
      {
        type: "text",
        label: "Artist Name",
        name: "UserSubmittedArtistName",
        value: ""
      },
      {
        type: "text",
        label: "Start Date",
        name: "UserSubmittedStartDate",
        value: ""
      },
      {
        type: "checkbox",
        label: "Free Drinks?",
        name: "UserSubmittedHasFreeDrinks",
        value: ""
      }
    ];
  }

  getIsSubmitting () {
    return this.isSubmitting;
  }

  getMessages () {
    return this.messages;
  }

  getInputs () {
    return this.inputs;
  }

  handleUpdateField ({name, value}) {
    const input = this.inputs.find(input => input.name === name);
    input.value = value;
    this.emitChange();
  }

  handleSubmissionStart (payload) {
    this.isSubmitting = true;
    this.messages = [{
      type: "nutral",
      text: "Submitting form"
    }];
    this.emitChange();
  }

  handleSubmissionSuccess () {
    this.isSubmitting = false;
    this.messages = this.messages = [{
      type: "good",
      text: "All good"
    }];
    this.inputs = this.inputs.map(input => {
      input.value = "";
      return input;
    });
    this.emitChange();
  }

  handleSubmissionFailed ({messages}) {
    this.isSubmitting = false;
    this.messages = messages;
    this.emitChange();
  }


  dehydrate () {
    return {
      isSubmitting: this.isSubmitting,
      messages: this.messages,
      inputs: this.inputs
    };
  }

  rehydrate (state) {
    this.isSubmitting = state.isSubmitting;
    this.messages = state.messages;
    this.inputs = state.inputs;
  }
}

export default SubmitEventStore;
