import React from 'react';
import { Router, Route } from '../../../lib';

import Home from './Home.jsx';
import About from './About.jsx';

function App() {
  return (
    <Router>
      <Route path="/" component={Home}>
        <Route path="/about" component={About} />
      </Route>
      <Route path="*" component={About} />
    </Router>
  );
}

export default App;
