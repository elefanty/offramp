const utils = {
  returnArray: objectOrArray => (Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray]),

  parsedRouteMobX: (routePath, currPath, routerStore) => {
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
      routerStore.params = paramsObj;
      newPath = modifiedUrl;
    }

    return newPath;
  }
};

module.exports = utils;
