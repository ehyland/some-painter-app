import React, {PropTypes, Component} from "react";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="Header-siteLogo">- SOMEPAINTER</div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
