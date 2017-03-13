import React from 'react';

import Nav from './Nav.jsx';

function Home(props) {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
}

Home.propTypes = {
  children: React.PropTypes.any
};

export default Home;
