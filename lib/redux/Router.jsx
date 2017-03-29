import React, { Component } from 'react';
import { connect } from 'react-redux';
import changePathname from './actions';

function parsedRoute(routePath, currPath) {
  if (!routePath) return;
  let newPath = { routePath, paramsObj: {} };
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

    newPath.paramsObj = paramsObj;
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

function findComponent(pathToFind, routes) {
  if (!pathToFind) throw new Error('Must enter valid path.');
  if (!Array.isArray(routes)) throw new Error('Input must be an array.');

  let parent = null;
  let children = null;

  let modifiedUrl;

  for (let i = 0; i < routes.length; i++) {
    if (!routes[i]) break;

    modifiedUrl = parsedRoute(routes[i].props.path, pathToFind);

    if(modifiedUrl) {
      if(modifiedUrl.routePath === pathToFind) {
        children = getIndexRoutes(routes[i]);
        parent = routes[i];
        break;
      }
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

  let queries = {};
  if (location.search) {
      queries = location.search.split(/&amp;/gi)
        .reduce((queries, cv) => {
          cv = cv.replace(/%20/gi, ' ').split('=');
          const key = cv[0].replace(/^\?/, '');
          const value = cv[1];
          queries[key] = value;
          return queries;
        }, {});
    }

  return parent ? React.cloneElement(parent, { children, params: modifiedUrl.paramsObj, queries }) : null;

}

let oneTimeOnly = true;

const Router = ({ router, children, dispatch }) => {
    let currPath = router.pathname;

     if(oneTimeOnly) {
      oneTimeOnly = false;
      setInterval(function() {
        if(currPath !== window.location.pathname) {
          dispatch(changePathname(window.location.pathname));
          currPath = window.location.pathname;
        }
      }, 100);
    }

    let componentToRender = findComponent(currPath, returnArray(children));

    if (!componentToRender) {
      const lastChild = children[children.length - 1];
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

const mapStateToProps = (state, ownProps) => ({
  ...state,
  ...ownProps
});

Router.propTypes = {
  store: React.PropTypes.object,
  children: React.PropTypes.any
};

export default connect(mapStateToProps)(Router);
