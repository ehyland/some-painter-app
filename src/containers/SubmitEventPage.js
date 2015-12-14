import React, {Component, PropTypes} from "react";
import { connectToStores } from "fluxible-addons-react";
import FormField from "../components/FormField";
import {fieldChange, submitEvent} from "../actions/SubmitEventFormActions";

@connectToStores(["SubmitEventStore"], context => {
  const store = context.getStore("SubmitEventStore");
  return {
    isSubmitting: store.getIsSubmitting(),
    messages: store.getMessages(),
    inputs: store.getInputs()
  };
})
class SubmitEventPage extends Component {

  static propTypes = {}
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }
  static defaultProps = {}

  handleChange (change) {
    this.context.executeAction(fieldChange, change);
  }

  handleFormSubmission (e) {
    e.preventDefault();
    this.context.executeAction(
      submitEvent,
      this.props.inputs.map(input => ({name: input.name, value: input.value}))
    );
  }

  render () {
    const {isSubmitting, messages, inputs} = this.props;
    return (
      <div className="SubmitEventPage">
        <div className="container">
          <form className="Form" onSubmit={this.handleFormSubmission.bind(this)}>
            <h1 className="Form-header">
              Create an event
            </h1>
            {messages.map(message => (
              <p className={message.type}>{message.text}</p>
            ))}
            <div className="Form-fields">
              {inputs.map(options => (
                <FormField
                  {...options}
                  key={options.name}
                  disabled={isSubmitting}
                  onChange={this.handleChange.bind(this)}
                />
              ))}
            </div>
            <div className="FormActions">
              <input className="FormActions-submit" type="submit" disabled={isSubmitting}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SubmitEventPage;
