import React from 'react';
import { observable, action, autorun, computed } from 'mobx';

class AppStore {
  @observable todos = [];

  @action addTodo = (todo) => {
    this.todos.push({
      task: todo,
      completed: false
    });
  }

  @action toggleTodo = (index) => {
    this.todos[index].completed = !this.todos[index].completed;
  }

}

export default AppStore;