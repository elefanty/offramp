import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

function parsedRoute(routePath, currPath, routeStore) {
  if (!routePath) return;
  let newPath = routePath;
  if (routePath.includes(':')) {
    const paramsObj = {};
    const routePaths = routePath.match(/[:a-zA-Z0-9_]+/g);
    const urlPath = currPath.match(/[:a-zA-Z0-9_]+/g);
    let modifiedUrl = '';

    if (routePaths && urlPath && routePaths.length === urlPath.length) {
      for (let i = 0; i < urlPath.length; i += 1) {
        if (!(routePaths[i] === urlPath[i]) && routePaths[i].slice(0, 1) === ':') {
          paramsObj[routePaths[i].slice(1)] = urlPath[i];
          modifiedUrl = `${modifiedUrl}/${urlPath[i]}`;
        } else {
          modifiedUrl = `${modifiedUrl}/${routePaths[i]}`;
        }
      }
    }

    routeStore.params = paramsObj;
    newPath = modifiedUrl;
  }

  return newPath;
}

function returnArray(objectOrArray) {
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}

function getIndexRoutes(currRoute) {
  let indexRoute = [];
  if (currRoute.props.children) {
    indexRoute = returnArray(currRoute.props.children).filter(route => route.props.index);
  }

  return indexRoute;
}

function findComponent(pathToFind, routes, routerStore) {
  // check if valid input
  if (!pathToFind) throw new Error('Must enter valid path.');
  if (!Array.isArray(routes)) throw new Error('Input must be an array.');

  let parent = null;
  let children = null;

  for (let i = 0; i < routes.length; i++) {
    if (!routes[i]) break;

    if (parsedRoute(routes[i].props.path, pathToFind, routerStore) === pathToFind) {
      children = getIndexRoutes(routes[i]);
      parent = routes[i];
      break;
    }

    if (routes[i].props.children) {
      if (!Array.isArray(routes[i].props.children)) {
        children = findComponent(pathToFind, [routes[i].props.children], routerStore);
      } else {
        children = findComponent(pathToFind, routes[i].props.children, routerStore);
      }
    }

    if (children) {
      parent = routes[i];
      break;
    }
  }

  return parent ? React.cloneElement(parent, { children }) : null;
}

@inject('store') @observer
class Router extends Component {

  renderComponent = (childRoutes, currPath, parentPath = '') => {
    const { store } = this.props;
    // childRoutes will contain all the current children
    // loop through each child route
    for (const route of childRoutes) {
      const pathToMatch = parsedRoute(route.props.path, currPath, parentPath, store.routes);
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
        {this.renderComponent(this.props.children, currPath)}
      </div>
    );
  }
}

Router.propTypes = {
  store: React.PropTypes.object,
  children: React.PropTypes.any
};

export default Router;
