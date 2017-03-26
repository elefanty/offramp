import React from 'react';

function HooksList(props) {
  return (
    <div>
      <h1>HooksList</h1>
      <ul>
        {props.data.map((hook, i) => (
          <li key={i}>{hook.name}</li>
        ))}
      </ul>
      {props.children}
    </div>
  );
}

export default HooksList;

// import React, { Component } from 'react';
//
// class HooksList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hooks: [],
//       mounted: true
//     };
//   }
//
//   componentWillMount() {
//     fetch(`/api/hooks`)
//       .then(res => res.json())
//       .then((data) => {
//         if (this.state.mounted) {
//           this.setState({
//             hooks: data
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//
//   componentWillUnmount() {
//     this.state.mounted = false;
//   }
//
//   render() {
//     return (
//       <div>
//         <h1>Hooks</h1>
//         <ul>
//           {this.state.hooks.length ? this.state.hooks.map((hook, i) => (
//             <li key={i}>{hook.name}</li>
//           )) : <p>Loading...</p>}
//         </ul>
//
//         {this.props.children}
//       </div>
//     );
//   }
// }
//
// export default HooksList;
