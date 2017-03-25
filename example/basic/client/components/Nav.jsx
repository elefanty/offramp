import React from 'react';
import { Link } from '../../../../lib/basic';

function Nav() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/users">User</Link></li>
      <li><Link to="/users/5">User 5</Link></li>
    </ul>
  );
}

export default Nav;
