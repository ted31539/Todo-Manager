const { ref } = require('../db/connect');

class Todo {
  async getAll() {
    let todos;
    await ref.once('value', (snapshot) => {
      todos = snapshot.val();
    });
    return todos;
  }
  async getTodo(id) {
    const todoRef = ref.child(id);
    let todo;
    await todoRef.once('value', (snapshot) => {
      todo = snapshot.val();
    });
    return todo;
  }
  async createTodo(todo) {
    let todoRef = ref.push();
    const todoId = todoRef.key;
    await todoRef.set(todo);
    return todoId;
  }
  async deleteTodo(id) {
    const todoRef = ref.child(id);
    let success;
    await todoRef.remove(() => {
      success = true;
    });
    return success;
  }
  async updateTodo(id, newTodo) {        
    const todoRef = ref.child(id);
    let success;
    await todoRef.update(newTodo, (err)=> {
      if (!err) {
        success = true;
      }
    });
    return success;
  }
}

const todoManager = new Todo();

module.exports = todoManager;
