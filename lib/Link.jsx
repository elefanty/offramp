import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('store')
class Link extends Component {
  clickHandler = (e) => {
    e.preventDefault();
    this.props.store.routes.push(e.target.getAttribute('href'));
  }

  render() {
    const linkText = this.props.children;

    return (
      <a
        href={this.props.to}
        className={this.props.className}
        onClick={this.clickHandler}>
        {linkText}
      </a>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.string,
  store: React.PropTypes.object
};

export default Link;
