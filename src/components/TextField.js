import React, {Component, PropTypes} from "react";
import classNames from "classnames";

class TextField extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  static defaultProps = {
    classNames: "FormField"
  }

  constructor (props) {
    super(props);
    this.state = {value: props.value};
  }

  componentWillReceiveProps (newProps) {
    this.setState({value: newProps.value})
  }

  onChange (e) {
    e.preventDefault();
    this.props.onChange({
      "name": this.props.name,
      "value": e.target.value
    });
    this.setState({value: e.target.value});
  }

  isEmpty() {
    return !this.props.value.length;
  }

  render () {
    const {type, name, value, label, disabled, className} = this.props;

    const className2 = classNames({
      [className]: true,
      "u-empty": this.isEmpty(),
      "u-filled": !this.isEmpty()
    })

    return (
      <div className={className2}>
        <input
          type={type}
          name={name}
          value={this.state.value}
          id={name}
          disabled={disabled}
          onChange={this.onChange.bind(this)}
          ref="input"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default TextField;
