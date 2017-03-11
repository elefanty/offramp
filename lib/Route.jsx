import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Route extends Component {
  render() {
    return (
      <this.props.component
        children={this.props.children}
        routes={this.props.store.routes}
      />
    );
  }
}

Route.propTypes = {
  children: React.PropTypes.any.isRequired,
  store: React.PropTypes.object.isRequired
};

export default Route;
