import React, {Component, PropTypes} from "react";
import classNames from "classnames";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";

class FormField extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {}

  render () {
    const {type} = this.props;
    const className = classNames({
      "FormField": true,
      [`FormField--${type}`]: true
    });

    const FieldType = type === "checkbox" ? CheckboxField : TextField;

    return (
      <FieldType
        className={className}
        {...this.props}
      />
    );
  }
}

export default FormField;
