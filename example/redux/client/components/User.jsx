import React from 'react';

function User(props) {
  return (
    <div>
      <h1>User {props.params.id} {props.queries.name} {props.queries.age}</h1>
    </div>
  );
}

export default User;