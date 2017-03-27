import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { resolve } from 'react-resolver';

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
    const { pathname, params, queries, push, goBack, goForward } = this.props.store.routes;

    const routes = {
      pathname,
      params,
      queries,
      push,
      goBack,
      goForward,
    };

    if (this.props.hooks && this.props.hooks.asyncBeforeEnter) {
      const resolver = (props) => (
        React.cloneElement(props.component, {
          data: props.data,
          children: props.children
        })
      );

      const ResolvedComponent = resolve('data', this.props.hooks.asyncBeforeEnter)(resolver);

      return (
        <ResolvedComponent component={
            <this.props.component
              children={this.props.children}
              routes={routes} />
          } />
      );
    }

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
