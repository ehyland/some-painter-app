/*eslint react/no-danger: 0*/

import React, {Component, PropTypes} from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import ga from "../ga";

@provideContext()
@connectToStores(["AppConfigStore"], context => ({
  appConfig: context.getStore("AppConfigStore").getConfig()
}))
class HTML extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    css: PropTypes.array.isRequired,
    scripts: PropTypes.array.isRequired
  }

  render() {

    const {css, scripts, content, state, googleAnalyticsCode} = this.props;
    const {DefaultSiteTitle, DefaultMetaDescription, DefaultMetaKeywords} = this.props.appConfig;

    return(
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>

          <meta name="keywords" content={DefaultMetaKeywords}/>
          <meta name="description" content={DefaultMetaDescription}/>

          <title>{DefaultSiteTitle}</title>

          {css.map((href, index) => <link key={index} rel="stylesheet" href={href}/>)}

        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: ga}}/>
          <div id="app" className="App" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: state}}/>
          {scripts.map((src, index) => <script key={index} src={src}/>)}
        </body>
      </html>
    );
  }
}

export default HTML;
