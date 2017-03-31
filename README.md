<p>
  <img alt='offramp-logo' src='./offramp_logo.jpeg'>
</p>

Offramp is a React library that provides simple routing for your single page applications.

### Features

 * Synchronized routing state with application state
 * Decoupled state from UI
 * Routes support hooks such as ```beforeEnter```, ```onEnter```, ```beforeExit```, and ```onExit```
 * Async-rendering & data-fetching before component render

## Quick Start
To get started, ```yarn add offramp```.
#### MobX
```javascript
import React from 'react';
import { render } from 'react-dom';
import { RouterStore, Router, Route } from 'offramp/mobx';
import { Provider } from 'mobx-react';

// import your mobx stores and place them in stores object
// create router property with a value of the routerStore
const routerStore = new RouterStore();

const stores = {
	// your stores here..
	router: routerStore
};
```
#### Redux
```javascript
import React from 'react';
import { render } from 'react-dom';
import { routerReducer, Router, Route } from 'offramp/redux';
import { Provider } from 'react-redux'

// import your reducers and pass them in with the routerReducer
const stores = createStore(combineReducers({
  // ...reducers
  router: routerReducer
});
```
#### React
```javascript
import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'offramp';
```
Once all the correct dependencies are imported, just define your routes
```javascript
// import all your components for your routes
import Main from './components/Main';
import Home from './components/Home';
import About from './components/About';
import UsersPage from './components/UsersPage';
import NotFound from './components/NotFound';

// if you're just using React, remove the Provider
render(
  <Provider store={stores}>
    <Router>
      <Route path='/' component={Main}>
        <Route index component={Home} />
        <Route path='/about' component={About} />
        <Route path='/users' component={UsersPage} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

## Getting Started

### Installation
Using [npm](https://www.npmjs.com/):

```
npm install offramp --save
```
or [yarn](https://yarnpkg.com/en/):
```
yarn add offramp
```

### Using Offramp

To get started, create your ```index.js``` file and import what you need depending on which state management library you are using:

```javascript
import React from 'react';
import { render } from 'react-dom';
import { routerStore, Router, Route } from 'offramp/mobx'; // mobx
import { routerReducer, Router, Route } from 'offramp/redux'; // redux
```

We use the Provider API to manage your stores throughout the app so we need to import it:
```javascript
import { Provider } from 'mobx-react'; // mobx
import { Provider } from 'react-redux'; // redux
```
If you are using MobX, then you'll need to import your stores and put them in a single store object with the routerStore as follows. This allows Offramp to make your router state available throughout the application:
```javascript
const stores = {
  // ...stores
  router: routerStore
};
```
If you are using Redux, we first need to import some utilities from the library:
```javascript
import { createStore, combineReducers } from 'redux';
```
Then create your store by combining your reducers and pass in the routerReducer:
```javascript
const stores = createStore(combineReducers({
  // ...reducers
  router: routerReducer
});
```
## Creating Routes
Routing in Offramp is meant to offer a familiar API and allow you to get your client-side navigation started quickly. To create your routing structure, just define your top level ```<Router>``` component that will wrap all your routes. Then, to structure your routes, just nest them within the ```<Router>``` component, and provide each of your routes with the correct component to render.
```javascript
// import your components
import Contact from './components/Contact';
import About from './components/About';

render(
  <Provider store={stores}>
    <Router>
      <Route path='/' component={Main}>
      <Route path='/about' component={About} />
      <Route path='/contact' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```
If you need to support nested routes for your application, just place routes within their immediate parent route component. If any of these children routes need to be an ```index``` route, just provide an ```index``` property on the expected index route.
```javascript
// import your components
import Main from './components/Main';
import Home from './components/Home';
import About from './components/About';
import UsersPage from './components/UsersPage';
import NotFound from './components/NotFound';

render(
  <Provider store={stores}>
    <Router>
      <Route path='/' component={Main}>
        <Route index component={Home} />
        <Route path='/about' component={About} />
        <Route path='/users' component={UsersPage} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```
### Router State
Offramp is meant to provide an easy way to handle any expected data when rendering your component. Just declare in your route paths where you expect a parameter, and Offramp will make sure both the current URL parameters and query parameters are updated and available directly in your store.   
```javascript
...
<Route path='/users' component={Users}>
  <Route path='/users/:id' component={User} />
</Route>
...
```

## Asynchronous Routes
If you need to support async hooks on a particular URL path, you first need to create a hooks object in a separate file and import it or define your hooks directly in your ```index.js``` file.
```javascript
// index.js

...
const userHooks = {
  beforeEnter() { ... },
  onEnter() { ... },
  beforeExit() { ... },
  onExit() { ... }
}
...
```
Once your hooks are defined you can pass them down into your components as a prop on that route component.
```javascript
...
<Route path='/users' component={Users}>
  <Route path='/users/:id' hooks={userHooks} component={User} />
</Route>
```
Prior to rendering your component, Offramp will check for the existence of any hooks. If a ```beforeEnter``` hook exists, Crossing will execute that function and prevent rendering until that function resolves. This means you no longer need to fetch data in life-cycle methods such as with ```componentWillMount```.
## Built in Components
Offramp provides a ```<Link />``` component to navigate between your different views. When defining your links, pass a ```to``` property on the component which points to the correct URL path and also a ```tag``` property which contains the links display text.
```javascript
<nav>
  <li><Link to='/' tag='Home' /></li>
  <li><Link to='/about' tag='About' /></li>
  <li><Link to='/users' tag='Users' /></li>
</nav>
```
## Upcoming Features
* Support declarative routing
* Memoize routes to prevent excessive recursive calls
