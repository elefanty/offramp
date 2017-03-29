import React from 'react';
import { Link } from '../../../../lib/mobx';

function Nav() {
  return (
    <ul>
      <li><Link to="/" tag="Home" /></li>
      <li><Link to="/about" tag="About" /></li>
      <li><Link to="/hooks" tag="Hooks" /></li>
    </ul>
  );
}

export default Nav;
