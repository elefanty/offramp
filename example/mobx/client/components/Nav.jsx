import React from 'react';
import { Link } from '../../../../lib/mobx';

function Nav() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/hooks">Hooks</Link></li>
    </ul>
  );
}

export default Nav;
