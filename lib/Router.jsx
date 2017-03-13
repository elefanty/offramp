import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

function parseCurrentRouter(routePath, currPath, parent, store) {
  // insert code here
  console.log(store);
}

@inject('store') @observer
class Router extends Component {

  renderComponent = (childRoutes, currPath, parentPath = '') => {
    const { store } = this.props;
    // childRoutes will contain all the current children
    // loop through each child route
    for (const route of childRoutes) {
      const pathToMatch = parseCurrentRouter(route.props.path, currPath, parentPath, store.routes);
      // check if the current url path is equal to the current routes path
      // if we're at the correct route, we want to clone that element and return it
      if (pathToMatch === currPath || `${parentPath}${route.props.path}` === currPath) {
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
      if (currPath.includes(pathToMatch)) {
        // check if the current route has children
        if (route.props.children) {
          // map through each child and recursively check each route
          let nestedChildRoutes = React.Children.map(route.props.children, (child) => {
            if (pathToMatch === '/') parentPath = '';
            else if (pathToMatch.includes(parentPath)) parentPath = pathToMatch;
            else parentPath = `${parentPath}${route.props.path}`;
            return this.renderComponent([child], currPath, parentPath);
          });

          if (nestedChildRoutes.length > 1) {
            nestedChildRoutes = nestedChildRoutes.filter(childRoute => (
              childRoute.props.path === currPath));
          }

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

Router.propTypes = {
  store: React.PropTypes.object,
  children: React.PropTypes.array
};

export default Router;
