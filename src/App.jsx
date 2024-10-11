import React from "react"
import "./App.css"
import commonStyles from "./common.module.css"
import TodoInput from "./components/TodoInput.jsx"
import FilteredTodoList from "./components/FilteredTodoList.jsx"
import ChipGroup from "./components/ui/ChipGroup.jsx"
import SeverityFilter from "./components/SeverityFilter.jsx"
import TextField from "./components/ui/TextField.jsx"
import Button from "./components/ui/Button.jsx"
import Spacer from "./components/ui/Spacer.jsx"
import { Guid } from "js-guid"
import { generateTodos } from "./utils.js"
import { debounce } from "lodash"

export const allSeverities = [
  { id: "urgent", name: "Urgent" },
  { id: "mid", name: "Mid" },
  { id: "notUrgent", name: "Not urgent" },
]

const filterOptions = [
  { id: "all", name: "All", filter: () => true },
  { id: "notDone", name: "Active", filter: (todo) => !todo.done },
  { id: "done", name: "Done", filter: (todo) => todo.done },
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      debouncedQuery: "",
      todos: [
        {
          id: Guid.newGuid(),
          name: "Take a walk with the dog",
          description:
            "While walking with the dog, I should definitely buy coffee and enjoy the beautiful weather",
          date: new Date(),
          done: false,
          severity: allSeverities[0],
        },
      ],
      severityFilterIds: [],
      filterByType: "all",
    }
  }

  render() {
    return (
      <div className={commonStyles.grid}>
        <h1>TODOIST</h1>
        <TextField
          placeholder="Search"
          value={this.state.query}
          onValueChange={this.handleSetQuery}
        />
        <div>
          <p className="title">Filter</p>
          <ChipGroup
            onChipChange={this.handleSetFilterByType}
            selectedChipId={this.state.filterByType}
            chips={filterOptions}
          />
          <Spacer size=".5rem" />
          <SeverityFilter
            todos={this.state.todos}
            selectedSeverityIds={this.state.severityFilterIds}
            onSeveritySelect={this.handleSeveritySelect}
            onSeverityDeselect={this.handleSeverityDeselect}
          />
        </div>
        <div className="scrollable">
          <FilteredTodoList
            todos={this.state.todos}
            selectedSeverityIds={this.state.severityFilterIds}
            query={this.state.debouncedQuery}
            filterByTypeFunc={this.getFilterByTypeFunc()}
            onTodoDoneChange={this.handleSetTodoDone}
            onTodoDelete={this.handleTodoDelete}
          />
        </div>

        <h2 className="fill-row">Add task</h2>

        <div className="fill-row">
          <TodoInput onAdd={this.handleAdd} severityList={allSeverities} />
          <Spacer size="0.25rem" />
          <Button name="Generate" onClick={this.handleTodoGenerate} />
        </div>
      </div>
    )
  }

  handleAdd = (name, description, severityId) =>
    this.setState({
      todos: [
        {
          id: Guid.newGuid(),
          name,
          description,
          done: false,
          severity: allSeverities.find((s) => s.id == severityId),
          date: new Date(),
        },
        ...this.state.todos,
      ],
    })

  handleSetFilterByType = (filterByType) => this.setState({ filterByType })

  debouncedSetQuery = debounce((debouncedQuery) =>
    this.setState({ debouncedQuery }),
    500
  )

  handleSetQuery = (query) => {
    this.setState({ query })
    this.debouncedSetQuery(query)
  }

  handleSetTodoDone = (id, done) => {
    const oldTodo = this.state.todos.find((todo) => todo.id === id)
    const newTodo = { ...oldTodo, done }

    this.setState({
      todos: this.state.todos
        .map((todo) => (todo.id === id ? newTodo : todo))
        .sort((a, b) => a.done - b.done),
    })
  }

  handleTodoDelete = (id) =>
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    })

  handleTodoGenerate = () =>
    this.setState({
      todos: [...this.state.todos, ...generateTodos()].sort(
        (a, b) => a.done - b.done
      ),
    })

  handleSeveritySelect = (severityId) => {
    this.setState({
      severityFilterIds: [...this.state.severityFilterIds, severityId],
    })
  }

  handleSeverityDeselect = (severityId) => {
    this.setState({
      severityFilterIds: this.state.severityFilterIds.filter(
        (f) => f !== severityId
      ),
    })
  }

  getFilterByTypeFunc = () =>
    filterOptions.find((f) => f.id === this.state.filterByType).filter
}
