/*eslint react/no-danger: 0*/

import React, {Component, PropTypes} from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import config from "../config";
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

    const openGraphTags = Object.keys(this.props.appConfig)
      .filter(option => option.match(/^(Default_OG_)/))
      .map(option => {
        return {
          property: option.substr("Default_".length).toLowerCase().replace(/_/g, ":"),
          content: this.props.appConfig[option]
        };
      });

    openGraphTags.push({
      property: "og:site_name",
      content: "Somepainter"
    },{
      property: "fb:app_id",
      content: config.fbAppId
    });

    return(
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>

          <meta name="keywords" content={DefaultMetaKeywords}/>
          <meta name="description" content={DefaultMetaDescription}/>

          {openGraphTags.map(props => (
            <meta key={props.property} property={props.property} content={props.content} />
          ))}

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
