import React, {Component, PropTypes} from "react";
import {submitForm, updateField} from "../actions/FormActions";
import FormField from "./FormField";
import FormAction from "./FormAction";

class Form extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    headerTag: PropTypes.string,
    inputs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  static defaultProps = {
    headerTag: "div"
  }

  handleInputChange ({name, value}) {
    this.context.executeAction(updateField, {
      formName: this.props.name,
      update: {
        name: name,
        value: value
      }
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.context.executeAction(submitForm, {
      formName: this.props.name,
      fields: this.props.inputs.map(field => ({
        name: field.name,
        value: field.value
      }))
    });
  }

  render () {
    const {headerText, headerTag, inputs, actions, state, messages} = this.props;
    const disabled = state === "submitting";

    const messageFields = messages.map(message => (
      <div className="Form-message">
        {message.get("text")}
      </div>
    )).toArray();

    let header, inputFields, actionFields;

    if (state !== "submitted") {
      header = React.createElement(headerTag, {
        className: "Form-header"
      }, headerText);

      inputFields = (
        <div className="Form-inputs">
          {inputs.map((input, name) => (
            <FormField key={name} {...input.toJS()} name={name} onChange={this.handleInputChange.bind(this)}/>
          )).toArray()}
        </div>
      );

      actionFields = (
        <div className="Form-actions">
          {actions.map(input => (
            <FormAction key={input.get("name")} disabled={disabled} {...input.toJS()}/>
          )).toArray()}
        </div>
      );
    }

    return (
      <form className="Form" onSubmit={this.handleSubmit.bind(this)}>
        {header}
        {messageFields}
        {inputFields}
        {actionFields}
      </form>
    );
  }
}

export default Form;
