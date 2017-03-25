import React from 'react';

import Nav from './Nav.jsx';

function Main(props) {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
}

Main.propTypes = {
  children: React.PropTypes.any
};

export default Main;
