import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux';

// import AppStore from './stores/app';
import App from './components/App.jsx';
import { reducers } from '../../../lib/redux';

// const appStore = new AppStore();
console.log(reducers)
const stores = createStore(combineReducers({
  router: reducers
}));

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
