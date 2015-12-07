import React, {PropTypes, Component} from "react";
import {TwitterSVG, FacebookSVG} from "./SVGs";
import classNames from "classnames"

class Footer extends Component {

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
              <a className="Footer-socialLink" target="_blank" href="https://www.facebook.com/Somepainter-509684752525178/">
                <FacebookSVG />
              </a>
              <a className="Footer-socialLink" target="_blank" href="https://twitter.com/bysomepainter">
                <TwitterSVG />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
