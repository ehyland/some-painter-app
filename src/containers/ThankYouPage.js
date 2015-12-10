import React, {Component, PropTypes} from "react";

class ThankYouPage extends Component {

  static propTypes = {}
  static defaultProps = {}

  getThankYouMessage () {
    const {appConfig} = this.props;
    const {thanksFor} = this.props.currentRoute.params;

    const testKey = "ThankYou_" +
      thanksFor
        .split("-")
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("_");

    if (appConfig.hasOwnProperty(testKey)) {
      return appConfig[testKey];
    }else {
      return "Thank You!";
    }
  }

  render () {
    return (
      <div className="ThankYouPage">
        <div className="container">
          <h2>{this.getThankYouMessage()}</h2>
        </div>
      </div>
    );
  }
}

export default ThankYouPage;
