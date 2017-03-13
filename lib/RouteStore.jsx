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
  }

  @action push = (newPath) => {
    this.pathname = newPath;
    history.push(newPath);
  }
}

export default new RouteStore();
