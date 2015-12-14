import Actions from "../constants/Actions";

export default {

  /**
   * Submit the event from
   * - SUBMIT_EVENT_FORM_START
   * - SUBMIT_EVENT_FORM_SUCCESS
   * - SUBMIT_EVENT_FORM_FAILED
   */
  submitEvent (context, payload, done) {
    context.dispatch(Actions.SUBMIT_EVENT_FORM_START, {});

    setTimeout(() => {
      context.dispatch(Actions.SUBMIT_EVENT_FORM_SUCCESS, {});
      done();
    }, 2000);
  },

  /**
   * Update a field value
   * - SUBMIT_EVENT_FORM_FIELD_UPDATE
   */
  fieldChange (context, payload, done) {
    context.dispatch(Actions.SUBMIT_EVENT_FORM_FIELD_UPDATE, payload);
    done();
  }
}
