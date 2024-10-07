import React from "react"
import TodoList from "./TodoList.jsx"

export default class FilteredTodoList extends React.PureComponent {

  getFilteredTodos = () => {
    const { todos, filterByTypeFunc, severities, query } =
      this.props

    const filterBySeverity =
      severities.length == 0
        ? () => true
        : (todo) => severities.includes(todo.severity.id)

    const queryLower = query.toLowerCase()
    const filterByQuery = query
      ? (todo) =>
          todo.name.toLowerCase().includes(queryLower) ||
          todo.description.toLowerCase().includes(queryLower)
      : () => true

    const composedFilter = this.composeFilters([
      filterByTypeFunc,
      filterBySeverity,
      filterByQuery,
    ])

    return todos.filter(composedFilter)
  }

  composeFilters = (filters) => (todo) =>
    filters.reduce((acc, f) => acc && f(todo), true)

  render() {
    return (
      <TodoList
        todos={this.getFilteredTodos()}
        onTodoDoneChange={this.props.onTodoDoneChange}
        onTodoDelete={this.props.onTodoDelete}
      />
    )
  }
}
