import React from 'react';

function Users(props) {
  return (
    <div>
      <h1>Users</h1>
      {props.children}
    </div>
  );
}

export default Users;