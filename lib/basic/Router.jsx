import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

function parsedRoute(routePath, currPath) {
  if (!routePath) return;
  let newPath = { routePath, params: {} };
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

    newPath.params = paramsObj;
    newPath.routePath = modifiedUrl;
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

function getQueries() {
  if (location.search) {
    return location.search.split(/&amp;/gi)
      .reduce((queries, cv) => {
        cv = cv.replace(/%20/gi, ' ').split('=');
        const key = cv[0].replace(/^\?/, '');
        const value = cv[1];
        queries[key] = value;
        return queries;
      }, {});
  }
}

function findComponent(pathToFind, routes, updatePath) {
  // check if valid input
  if (!pathToFind) throw new Error('Must enter valid path.');
  if (!Array.isArray(routes)) throw new Error('Input must be an array.');

  let parent = null;
  let children = null;
  let params = {};
  let queries = {};

  for (let i = 0; i < routes.length; i++) {
    if (!routes[i]) break;

    let check = parsedRoute(routes[i].props.path, pathToFind);
    if (check && check.routePath === pathToFind) {
      children = getIndexRoutes(routes[i]);
      params = check.params;
      parent = routes[i];
      break;
    }

    if (routes[i].props.children) {
      if (!Array.isArray(routes[i].props.children)) {
        children = findComponent(pathToFind, [routes[i].props.children]);
      } else {
        children = findComponent(pathToFind, routes[i].props.children);
      }
    }

    if (children) {
      parent = routes[i];
      break;
    }
  }
  // check for queries before render
  queries = getQueries();

  return parent ? React.cloneElement(parent, { children, params, queries }) : null;
}

export class Router extends Component {
  constructor() {
    super();

    this.state = {
      path: history.location.pathname,
    }

    this.checkURLChange = setInterval(this.checkUrl, 100);
  }

  checkUrl = () => {
    const currPath = history.location.pathname;

    // if current path is different, update it
    if (currPath !== this.state.path) {
      this.setState({ path: currPath });
    }
  }

  render() {
    const currPath = this.state.path;

    let componentToRender = findComponent(currPath, returnArray(this.props.children));

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
  children: React.PropTypes.any
};
