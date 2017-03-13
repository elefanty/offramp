import React, { Component } from 'react';
import routeStore from './RouteStore';

class Link extends Component {
  handleClick = (e) => {
    e.preventDefault();
    routeStore.push(this.props.to);
  }

  render() {
    const linkText = this.props.children;

    return (
      <a href={this.props.to} onClick={this.handleClick}>{linkText}</a>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired
};

export default Link;
