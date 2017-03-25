import React, { Component } from 'react';

class Link extends Component {
  render() {
    const linkText = this.props.children;

    return (
      <a
        href={this.props.to}
        className={this.props.className}
        onClick={this.props.updatePath}>
        {linkText}
      </a>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.string,
};

export default Link;
