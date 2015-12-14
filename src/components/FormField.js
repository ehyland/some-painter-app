import React, {Component, PropTypes} from "react";
import classNames from "classnames";

class FormField extends Component {

  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {isEmpty: true};
  }

  getValue() {
    if (this.props.type === "checkbox") {
      return this.refs["input"].checked;
    }else {
      return this.refs["input"].value;
    }
  }

  handleInputChange (e) {
    const value = this.getValue();
    const isEmpty = !value.length;
    if (this.state.isEmpty !== isEmpty) {
      this.setState({isEmpty: isEmpty});
    }
    this.props.onChange({name: this.props.name, value: value});
  }

  render () {
    const {type, name, value, label, disabled} = this.props;
    const className = classNames({
      "FormField": true,
      [`FormField--${type}`]: true,
      "u-filled": !this.state.isEmpty
    });

    return (
      <div className={className}>
        <input
          type={type}
          name={name}
          value={value}
          id={name}
          disabled={disabled}
          onChange={this.handleInputChange.bind(this)}
          ref="input"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default FormField;
