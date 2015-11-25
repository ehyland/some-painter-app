import React, {Component, PropTypes} from "react";

class Page extends Component {
  static propTypes = {}

  render() {
    return(
      <div className="Page">
        {this.props.children}
      </div>
    );
  }
}

export default Page;
