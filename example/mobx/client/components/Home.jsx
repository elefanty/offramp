import React from 'react';
import { inject, observer } from 'mobx-react';

function Home(props) {
  const { appStore } = props.store;

  return (
    <div>
      <h1>Home</h1>

      <h3>Add Todo</h3>
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        this.props.store.appStore.addTodo(e.target.todo.value); 
        e.target.todo.value = ''; 
        }}>
        <input type="text" name="todo" placeholder="add todo.." autoComplete="off" />
        <button>Add</button>
      </form>

      <ul>
        {props.store.appStore.todos.map((todo, i) => (
          <li key={i}>
            <input type="checkbox" value={todo.task} checked={todo.completed} onChange={() => appStore.toggleTodo(i)} />
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

Home.propTypes = {
  children: React.PropTypes.any
};

export default inject('store')(observer(Home));
