import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Actions from "../constants/Actions";
import FormModels from "../constants/FormModels";

class FormStore extends BaseStore {

  static storeName = "FormStore";
  static handlers = {
    [Actions.FORM_FIELD_UPDATE]: "handleUpdateField",
    [Actions.FORM_SUBMIT_START]: "handleSubmissionStart",
    [Actions.FORM_SUBMIT_SUCCESS]: "handleSubmissionSuccess",
    [Actions.FORM_SUBMIT_FAILED]: "handleSubmissionFailed"
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.forms = Immutable.fromJS(FormModels);
  }

  getForm (formName) {
    return this.forms.get(formName);
  }

  handleUpdateField ({formName, update:{name, value}}) {
    this.forms = this.forms.setIn([formName, "inputs", name, "value"], value);
    this.emitChange();
  }

  handleSubmissionStart ({formName}) {
    this.forms = this.forms.setIn([formName, "state"], "submitting");
    this.emitChange();
  }

  handleSubmissionSuccess ({formName}) {
    const submissionMessage = "Submission successful. Once reviewed you will see in on the site";
    this.forms = this.forms
      .setIn([formName, "state"], "submitted")
      .setIn([formName, "messages"], Immutable.fromJS([{
        text: submissionMessage
      }]));
    this.emitChange();
  }

  handleSubmissionFailed ({formName, messages}) {
    this.forms = this.forms.setIn([formName, "state"], "error");
    this.emitChange();
  }

  dehydrate () {
    return {
      forms: this.forms.toJS()
    };
  }

  rehydrate (state) {
    this.forms = Immutable.fromJS(state.forms);
  }
}

export default FormStore;
