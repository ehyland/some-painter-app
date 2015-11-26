import React, {PropTypes, Component} from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-4 col-sm-6 col-sm-offset-6">
              <div className="Footer-copyright">Copyright 2015 -Somepainter</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
