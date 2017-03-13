import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Route extends Component {
  componentDidMount() {
    if (this.props.hooks && this.props.hooks.onEnter) {
      this.props.hooks.onEnter();
    }
  }

  componentWillUnmount() {
    if (this.props.hooks && this.props.hooks.beforeExit) {
      this.props.hooks.beforeExit();
    }
  }

  render() {
    return (
      <this.props.component
        params={this.props.store.routes.params}
        children={this.props.children}
        routes={this.props.store.routes}
      />
    );
  }
}

Route.propTypes = {
  children: React.PropTypes.any,
  store: React.PropTypes.object,
  hooks: React.PropTypes.any
};

export default Route;
