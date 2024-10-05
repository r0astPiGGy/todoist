import React from "react"
import "./App.css"
import commonStyles from "./common.module.css"
import TodoInput from "./components/TodoInput.jsx"
import TodoList from "./components/TodoList.jsx"
import ChipGroup from "./components/ui/ChipGroup.jsx"
import TextField from "./components/ui/TextField.jsx"
import Button from "./components/ui/Button.jsx"
import Spacer from "./components/ui/Spacer.jsx"
import { Guid } from "js-guid"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      severities: [
        { id: "urgent", name: "Urgent" },
        { id: "mid", name: "Mid" },
        { id: "notUrgent", name: "Not urgent" },
      ],
      input: {
        name: "",
        description: "",
        error: null,
        severityId: "mid",
      },
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
      filterOptions: [
        { id: "all", name: "All", filter: () => true },
        { id: "notDone", name: "Active", filter: (todo) => !todo.done },
        { id: "done", name: "Done", filter: (todo) => todo.done },
      ],
    }
  }

  setInputState = (state) => {
    const obj = {
      ...this.state.input,
    }

    Object.entries(state).forEach(([k, v]) => (obj[k] = v))

    this.setState({ input: obj })
  }

  handleAdd = (name, description, severityId) => {
    if (!name) {
      this.setInputState({ error: "Task name cannot be empty" })
      return
    }
    if (name.startsWith(" ")) {
      this.setInputState({
        error: "Task name should not start with a whitespace",
      })
      return
    }
    if (name.endsWith(" ")) {
      this.setInputState({
        error: "Task name should not end with a whitespace",
      })
      return
    }

    this.setState({
      input: {
        ...this.state.input,
        name: "",
        description: "",
        error: null,
      },
      todos: [
        {
          id: Guid.newGuid(),
          name,
          description,
          done: false,
          severity: this.state.severities.find((s) => s.id == severityId),
          date: new Date(),
        },
        ...this.state.todos,
      ],
    })
  }

  handleSetName = (name) => this.setInputState({ name })

  handleSetDescription = (description) => this.setInputState({ description })

  handleSetFilterOption = (filterOption) => this.setState({ filterOption })

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

  getFilteredTodos = () => {
    const { todos, filterOption, filterOptions } = this.state
    const filterFunc = filterOptions.find((f) => f.id === filterOption).filter
    return todos.filter(filterFunc)
  }

  handleInputSeverityChange = (severityId) =>
    this.setInputState({
      severityId,
    })

  handleTodoGenerate = () => {
    const array = Array.from({ length: 100 }, (_, i) => i).map((i) => ({
      id: Guid.newGuid(),
      name: `${i} todo`,
      description: `${i} description`,
      done: false,
      date: new Date(),
      severity: this.state.severities[0],
    }))

    this.setState({
      todos: array,
    })
  }

  render() {
    return (
      <div className={commonStyles.grid}>
        <h1>TODOIST</h1>
        <TextField placeholder="Search" />

        <div>
          <p className="title">Filter</p>
          <ChipGroup
            onChipChange={this.handleSetFilterOption}
            selectedChipId={this.state.filterOption}
            chips={this.state.filterOptions}
          />
        </div>
        <div className="scrollable">
          <TodoList
            todos={this.getFilteredTodos()}
            onTodoDoneChange={this.handleSetTodoDone}
            onTodoDelete={this.handleTodoDelete}
          />
        </div>

        <h2 className="fill-row">Add task</h2>

        <div className="fill-row">
          <TodoInput
            name={this.state.input.name}
            description={this.state.input.description}
            onAdd={this.handleAdd}
            error={this.state.input.error}
            onNameChange={this.handleSetName}
            onDescriptionChange={this.handleSetDescription}
            onSeverityChange={this.handleInputSeverityChange}
            severityList={this.state.severities}
            selectedSeverity={this.state.input.severityId}
          />
          <Spacer size="0.25rem" />
          <Button name="Generate" onClick={this.handleTodoGenerate} />
        </div>
      </div>
    )
  }
}
