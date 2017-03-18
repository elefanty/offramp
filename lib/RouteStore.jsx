import { observable, action } from 'mobx';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class RouteStore {
  @observable pathname;

  constructor() {
    this.pathname = history.location.pathname;
    this.params = {};
    this.queries = this.getQueries(location.search);

    this.checkUrlChange = setInterval(this.checkUrl, 100);
  }

  @action push = (newPath) => {
    this.pathname = newPath;
    this.params = {};
    history.push(newPath);
    this.queries = this.getQueries(location.search);
  }

  // get current queries
  getQueries = (query) => {
    if (location.search) {
      return query.split(/&amp;/gi)
        .reduce((queries, cv) => {
          cv = cv.replace(/%20/gi, ' ').split('=');
          const key = cv[0].replace(/^\?/, '');
          const value = cv[1];
          queries[key] = value;
          return queries;
        }, {});
    }
  }

  // go back
  checkUrl = () => {
    const currPath = window.location.pathname;

    // if current path is different, update it
    if (currPath !== this.path) {
      this.pathname = currPath;
    }
  }
}

export default new RouteStore();
