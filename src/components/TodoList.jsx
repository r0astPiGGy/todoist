import React from "react"
import styles from "./TodoList.module.css"
import Todo from "./Todo.jsx"

export default class TodoList extends React.PureComponent {
  render() {
    const { todos, onTodoDoneChange, onTodoDelete } = this.props

    return (
      <div className={styles["todo-list"]}>
        {todos.length > 0 || <p className={styles.empty}>Empty</p>}
        {todos.map((todo) => (
          <Todo
            key={todo.id}
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
