import React from 'react';
import { Router, Route } from '../../../../lib/mobx';

import Main from './Main.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import HooksList from './HooksList.jsx';

const hooks = {
  asyncBeforeEnter: () => {
    return fetch(`/api/hooks`)
      .then(res => res.json())
  },
  onEnter: () => {
    console.log('on enter')
  }
};

function App() {
  return (
    <Router>
      <Route path="/" component={Main}>
        <Route index component={Home} />
        <Route path="/about" component={About} />
        <Route path="/hooks" hooks={hooks} component={HooksList} />
      </Route>
      <Route path="*" component={About} />
    </Router>
  );
}

export default App;
