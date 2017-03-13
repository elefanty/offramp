import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, routeStore } from '../../lib';
import { AppContainer } from 'react-hot-loader';

import App from './components/App.jsx';

const stores = {
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
