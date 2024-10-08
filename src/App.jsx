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

const allSeverities = [
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
      severityFilters: [],
      todos: [
        {
          id: Guid.newGuid(),
          name: "Take a walk with the dog",
          description:
            "While walking with the dog, I should definitely buy coffee and enjoy the beautiful weather",
          date: new Date(),
          done: false,
          severity: { id: "mid", name: "Mid" },
        },
      ],
      filterOption: "all",
    }
  }

  handleAdd = (name, description, severityId) => {
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
  }

  handleSetFilterOption = (filterOption) => this.setState({ filterOption })

  handleSetQuery = (query) => this.setState({ query })

  handleSetTodoDone = (todo, done) => {
    const index = this.state.todos.indexOf(todo)
    const newTodo = { ...this.state.todos[index], done }

    this.setState({
      todos: this.state.todos
        .map((todo, i) => (i === index ? newTodo : todo))
        .sort((a, b) => a.done - b.done),
    })
  }

  handleTodoDelete = (todo) =>
    this.setState({
      todos: this.state.todos.filter((t) => t !== todo),
    })

  handleTodoGenerate = () => {
    const array = Array.from({ length: 1000 }, (_, i) => i).map((i) => ({
      id: Guid.newGuid(),
      name: `${i} todo`,
      description: `${i} description`,
      done: false,
      date: new Date(),
      severity: allSeverities[0],
    }))

    this.setState({
      todos: [...this.state.todos, ...array],
    })
  }

  handleSeveritySelect = (severityId) => {
    this.setState({
      severityFilters: [...this.state.severityFilters, severityId],
    })
  }

  handleSeverityDeselect = (severityId) => {
    this.setState({
      severityFilters: this.state.severityFilters.filter(
        (f) => f !== severityId
      ),
    })
  }

  getSelectedSeverities = () =>
    this.state.severityFilters.filter((s) => {
      return allSeverities.findIndex((av) => av.id === s) !== -1
    })

  getSeverities = () =>
    [...new Set(this.state.todos.map((t) => t.severity.id))]
      .sort((a, b) => a.localeCompare(b))
      .map((id) => this.state.severityFilters.find((s) => s.id === id))

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
            onChipChange={this.handleSetFilterOption}
            selectedChipId={this.state.filterOption}
            chips={filterOptions}
          />
          <Spacer size=".5rem" />
          <SeverityFilter
            todos={this.state.todos}
            severities={allSeverities}
            severityFilters={this.state.severityFilters}
            onChipSelect={this.handleSeveritySelect}
            onChipDeselect={this.handleSeverityDeselect}
          />
        </div>
        <div className="scrollable">
          <FilteredTodoList
            todos={this.state.todos}
            severities={this.state.severityFilters}
            query={this.state.query}
            filterByTypeFunc={
              filterOptions.find((f) => f.id === this.state.filterOption).filter
            }
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
}
