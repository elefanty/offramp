import React from 'react';

function Test(props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

Test.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Test;
