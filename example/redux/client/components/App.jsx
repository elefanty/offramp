import React from 'react';
import { Router, Route } from '../../../../lib/redux';

import Main from './Main.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Users from './Users.jsx';
import User from './User.jsx';

function App() {
  return (
    <Router>
      <Route path="/" component={Main}>
        <Route index component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users}>
          <Route path="/users/:id" component={User} />
        </Route>
      </Route>
      <Route path="*" component={About} />
    </Router>
  );
}

export default App;
