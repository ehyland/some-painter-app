import React, {PropTypes, Component} from "react";
import {TwitterSVG, FacebookSVG} from "./SVGs";
import ShareLink from "./ShareLink";
import classNames from "classnames"

class Footer extends Component {

  getFBShareLink () {
    const params = {
      app_id: "199112500427767",
      display: "popup",
      href: "http://somepainter.com.au/",
      redirect_uri: "http://somepainter.com.au/"
    };

    const paramsString = Object.keys(params).reduce( (result, key, i) => {
      result += (i === 0) ? "?" : "&";
      result += `${key}=${encodeURIComponent(params[key])}`;
      return result;
    }, "");

    return "https://www.facebook.com/dialog/share" + paramsString;
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
              <ShareLink className="Footer-socialLink" href={this.getFBShareLink()}>
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
