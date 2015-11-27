import React, {PropTypes, Component} from "react";
import {NavLink} from "fluxible-router";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <NavLink routeName="home" className="Header-siteLogo">- SOMEPAINTER</NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
