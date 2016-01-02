import React, {Component, PropTypes} from "react";

class FormAction extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }
  static defaultProps = {}

  render () {
    return (
      <input type="submit" className="FormAction" />
    );
  }
}

export default FormAction;
