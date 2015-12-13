import React, {PropTypes, Component} from "react";
import {TwitterSVG, FacebookSVG} from "./SVGs";
import ShareLink from "./ShareLink";
import classNames from "classnames";
import {siteURL} from "../config";

class Footer extends Component {

  paramsToString (params) {
    return Object.keys(params).reduce( (result, key, i) => {
      result += (i === 0) ? "?" : "&";
      result += `${key}=${encodeURIComponent(params[key])}`;
      return result;
    }, "");
  }

  getFBShareLink () {
    const params = {
      app_id: "199112500427767",
      display: "popup",
      href: siteURL,
      redirect_uri: siteURL + "thank-you/facebook-share"
    };

    return "https://www.facebook.com/dialog/share" + this.paramsToString(params);
  }

  getTwitterShareLink () {
    const {Twitter_Share_Text, Twitter_Share_HashTags} = this.props.appConfig;
    const params = {
      "text": Twitter_Share_Text,
      "url": siteURL,
      "hashtags": Twitter_Share_HashTags,
      "via": "bysomepainter"
    };

    return "https://twitter.com/intent/tweet" + this.paramsToString(params);
  }

  render() {
    const gridClasses = classNames([
      "col-lg-offset-4", "col-lg-8",
      "col-md-offset-5", "col-md-7",
      "col-sm-offset-6", "col-sm-6"
    ]);
    return (
      <footer className="Footer">
        <div className="container">
          <div className="row">
            <div className={gridClasses}>
              <div className="Footer-copyright">Copyright 2015 -Somepainter</div>
              <ShareLink className="Footer-socialLink" href={this.getFBShareLink()}>
                <FacebookSVG />
              </ShareLink>
              <ShareLink className="Footer-socialLink" href={this.getTwitterShareLink()}>
                <TwitterSVG />
              </ShareLink>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}


export default Footer;
