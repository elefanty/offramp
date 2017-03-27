import React from 'react';
import { Router, Route } from '../../../../lib/basic';

import Main from './Main.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Default from './Default.jsx';
import Users from './Users.jsx';
import User from './User.jsx';
import NotFound from './NotFound.jsx';

function App() {
  return (
    <Router>
      <Route path="/" component={Main}>
        <Route index component={Default} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users}>
          <Route path="/users/:id" component={User} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

export default App;
