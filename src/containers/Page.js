import React, {Component, PropTypes} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Page extends Component {
  static propTypes = {}

  render() {
    return(
      <div className="Page">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Page;
