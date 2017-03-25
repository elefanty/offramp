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
  render() {
    const { routes } = this.props.store;
    const currPath = routes.pathname;

    let componentToRender = findComponent(currPath, returnArray(this.props.children), routes);

    if (!componentToRender) {
      const lastChild = this.props.children[this.props.children.length - 1];
      if (lastChild.props.path === '*') {
        componentToRender = lastChild;
      }
    }

    return (
      <div>
        {componentToRender}
      </div>
    );
  }
}

Router.propTypes = {
  store: React.PropTypes.object,
  children: React.PropTypes.any
};

export default Router;
