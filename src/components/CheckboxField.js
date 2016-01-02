import React, {Component, PropTypes} from "react";

class CheckboxField extends Component {

  static propTypes = {}
  static defaultProps = {}

  handleChange (e) {
    e.preventDefault();
    this.props.onChange({
      "name": this.props.name,
      "value": e.target.checked
    });
  }

  render () {
    const {type, name, value, label, disabled, className} = this.props;

    return (
      <div className={className}>
        <input
          type={type}
          name={name}
          checked={value}
          id={name}
          disabled={disabled}
          onChange={this.handleChange.bind(this)}
          ref="input"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default CheckboxField;
