import { observable, action } from 'mobx';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class RouteStore {
  @observable pathname;
  @observable queries;

  constructor() {
    this.pathname = history.location.pathname;
    this.queries = {};
    this.params = {};

    this.checkUrlChange = setInterval(this.checkUrl, 100);
  }

  @action push = (newPath) => {
    this.pathname = newPath;
    history.push(newPath);
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
