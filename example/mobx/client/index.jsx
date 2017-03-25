import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { routeStore } from '../../../lib/mobx';
import { AppContainer } from 'react-hot-loader';

import AppStore from './stores/app';
import App from './components/App.jsx';

const appStore = new AppStore();

const stores = {
  appStore,
  routes: routeStore
};

const render = (Component) => {
  ReactDOM.render(
    <Provider store={stores}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    render(App);
  });
}
