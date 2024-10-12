import React from "react"
import TodoList from "./TodoList.jsx"

export default class FilteredTodoList extends React.PureComponent {
  render() {
    return (
      <TodoList
        todos={this.getFilteredTodos()}
        onTodoDoneChange={this.props.onTodoDoneChange}
        onTodoDelete={this.props.onTodoDelete}
      />
    )
  }

  getFilteredTodos = () => {
    const { todos, filters } = this.props

    return todos.filter(this.composeFilters(Object.values(filters)))
  }

  composeFilters = (filters) => (todo) =>
    filters.reduce((acc, f) => acc && f(todo), true)
}
