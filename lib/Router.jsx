import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Router extends Component {

  renderComponent = (childRoutes, currPath, parentPath = '') => {
    // childRoutes will contain all the current children
    // loop through each child route
    for (const route of childRoutes) {
      // check if the current url path is equal to the current routes path
      // if we're at the correct route, we want to clone that element and return it
      if (route.props.path === currPath || `${parentPath}${route.props.path}` === currPath) {
        // check if the current route contains any index routes as children
        // works with multiple index routes
        let indexRoutes = [];
        if (route.props.children) {
          indexRoutes = React.Children.map(route.props.children, (child) => {
            if (child.props.index) return child;
          });
        }

        return React.cloneElement(route, null, [...indexRoutes]);
      }

      // check if the current url path includes the route we're on
      // if it doesn't, don't check this routes child routes
      if (currPath.includes(route.props.path)) {
        // check if the current route has children
        if (route.props.children) {
          // map through each child and recursively check each route
          const nestedChildRoutes = React.Children.map(route.props.children, (child) => {
            parentPath = route.props.path === '/' ? '' :
              parentPath.includes(route.props.path) ?
              `${parentPath}` :
              `${parentPath}${route.props.path}`;
            return this.renderComponent([child], currPath, parentPath);
          });

          // return the current route and pass in all the child routes that need to be rendered
          return React.cloneElement(route, null, [...nestedChildRoutes]);
        }
      }
    }
  }

  render() {
    const currPath = this.props.store.routes.pathname;

    return (
      <div>
        <h1>Render route here</h1>
        {this.renderComponent(this.props.children, currPath)}
      </div>
    );
  }
}

export default Router;
