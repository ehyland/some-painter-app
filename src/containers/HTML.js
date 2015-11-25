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
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.content}}/>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}/>
        </body>
      </html>
    );
  }
}

export default HTML;
