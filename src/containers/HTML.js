/*eslint react/no-danger: 0*/

import React, {Component, PropTypes} from "react";

class HTML extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  render() {
    return(
      <html lang="en">
        <head>
          <meta charSet="UTF-8"/>
          <title>Document</title>
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.content}} />
      </html>
    );
  }
}

export default HTML;
