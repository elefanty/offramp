import React, { Component } from 'react';
import { history } from './Router.jsx';

class Link extends Component {
  updatePath(e) {
    e.preventDefault();
    history.push(e.target.getAttribute('href'));
  }

  render() {
    const linkText = this.props.children;
    console.log(history)
    return (
      <a
        href={this.props.to}
        className={this.props.className}
        onClick={this.updatePath}>
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
