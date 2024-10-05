import React from "react"
import "./TodoList.css"
import Todo from "./Todo.jsx"

export default class TodoList extends React.Component {
  render() {
    const { todos, onTodoDoneChange, onTodoDelete } = this.props

    return (
      <div className="todo-list">
        {todos.length > 0 || <p className="empty">Empty</p>}
        {todos.map((todo) => (
          <Todo
            name={todo.name}
            description={todo.description}
            date={todo.date}
            done={todo.done}
            onDelete={() => onTodoDelete(todo)}
            onDoneChange={(done) => onTodoDoneChange(todo, done)}
          />
        ))}
      </div>
    )
  }
}
