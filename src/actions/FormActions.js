import Actions from "../constants/Actions";

export default {

  /**
   * Submit the event from
   *
   * Dispatches:
   * - FORM_SUBMIT_START
   * - FORM_SUBMIT_SUCCESS
   * - FORM_SUBMIT_FAILED
   */
  submitForm (context, {formName, fields}, done) {
    context.dispatch(Actions.FORM_SUBMIT_START, {formName: formName});

    setTimeout(() => {
      context.dispatch(Actions.FORM_SUBMIT_SUCCESS, {formName: formName});
      done();
    }, 2000);
  },

  /**
   * Update a field value
   *
   * Dispatches:
   * - FORM_FIELD_UPDATE
   */
  updateField (context, {formName, update}, done) {
    context.dispatch(Actions.FORM_FIELD_UPDATE, {
      formName: formName,
      update: update
    });
    done();
  }
}
