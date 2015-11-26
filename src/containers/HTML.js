/*eslint react/no-danger: 0*/

import React, {Component, PropTypes} from "react";

class HTML extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    css: PropTypes.array.isRequired,
    scripts: PropTypes.array.isRequired
  }

  render() {

    const {css, scripts, content, state} = this.props;
    return(
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"/>

          <title>Document</title>
          {css.map((href, index) => <link key={index} rel="stylesheet" href={href}/>)}
        </head>
        <body>
          <div id="app" className="App" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: state}}/>
          {scripts.map((src, index) => <script key={index} src={src}/>)}
        </body>
      </html>
    );
  }
}

export default HTML;
