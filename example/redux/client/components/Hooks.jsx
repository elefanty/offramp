import React from 'react';

function Hooks(props) {
  console.log(props);
  return (
    <div>
      <h1>Hooks</h1>
      <ul>
        {props.data.map((hook, i) => (
          <li key={i}>{hook.name}</li>
        ))}
      </ul>
      {props.children}
    </div>
  );
}

export default Hooks;
