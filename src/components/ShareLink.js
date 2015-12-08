import React, {Component, PropTypes} from "react";

class ShareLink extends Component {

  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: "ShareLink"
  }

  handleShareClick (e) {
    if (window && window.open) {
      e.preventDefault();
      window.open(this.props.href, "pop", "width=600, height=400, scrollbars=no");
    }
  }

  render () {
    const {children, className, href} = this.props;
    return (
      <a className={className} target="_blank" href={href} onClick={this.handleShareClick.bind(this)}>
        {children}
      </a>
    );
  }
}

export default ShareLink;
