import React from 'react';
import { Link } from '../../../../lib/redux';

function Nav() {
  return (
    <ul>
      <li><Link to="/" tag="Home" /></li>
      <li><Link to="/about" tag="About" /></li>
      <li><Link to="/users" tag="Users" /></li>
      <li><Link to="/users/5" tag="User 5" /></li>
      <li><Link to="/hooks" tag="Hooks" /></li>
    </ul>
  );
}

export default Nav;
