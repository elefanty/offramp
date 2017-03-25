import React from 'react';
import { Router, Route } from '../../../../lib/basic';

import Main from './Main.jsx';
import Home from './Home.jsx';
import About from './About.jsx';

function App() {
  return (
    <Router>
      <Route path="/" component={Main}>
        <Route index component={About} />
        <Route path="/about" component={About} />
      </Route>
      <Route path="*" component={About} />
    </Router>
  );
}

export default App;
