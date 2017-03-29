import React from 'react';
import { Link } from '../../../../lib/basic';

function Nav() {
  return (
    <ul>
      <li><Link to="/" tag="Home" /></li>
      <li><Link to="/about" tag="About" /></li>
      <li><Link to="/users" tag="User" /></li>
      <li><Link to="/users/5" tag="User 5" /></li>
    </ul>
  );
}

export default Nav;
