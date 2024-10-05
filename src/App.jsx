import React from "react";
import "./App.css";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import ChipGroup from "./components/ChipGroup.jsx";
import { Guid } from "js-guid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      todos: [
        {
          id: Guid.newGuid(),
          name: "Take a walk with the dog",
          description: "While walking with the dog, I should definitely buy coffee and enjoy the beautiful weather",
          date: new Date(),
          done: false
        }
      ],
      error: null,
      filterOption: "all",
      filterOptions: {
        all: { name: "All", filter: () => true },
        notDone: { name: "Active", filter: (todo) => !todo.done },
        done: { name: "Done", filter: (todo) => todo.done },
      },
    };
  }

  handleAdd = (name, description) => {
    if (!name) {
      this.setState({ error: "Task name cannot be empty" });
      return;
    }
    if (name.startsWith(" ")) {
      this.setState({ error: "Task name should not start with a whitespace" });
      return;
    }
    if (name.endsWith(" ")) {
      this.setState({ error: "Task name should not end with a whitespace" });
      return;
    }

    this.setState({
      name: "",
      description: "",
      error: null,
      todos: [
        { id: Guid.newGuid(), name, description, done: false, date: new Date() },
        ...this.state.todos,
      ],
    });
  };

  handleSetName = (name) => this.setState({ name });

  handleSetDescription = (description) => this.setState({ description });

  handleSetFilterOption = (filterOption) => this.setState({ filterOption });

  handleSetTodoDone = (todo, done) => {
    const index = this.state.todos.indexOf(todo);
    const newTodo = { ...this.state.todos[index], done };

    this.setState({
      todos: this.state.todos
        .map((todo, i) => (i === index ? newTodo : todo))
        .sort((a, b) => a.done - b.done),
    });
  };

  handleTodoDelete = (todo) =>
    this.setState({
      todos: this.state.todos.filter((t) => t !== todo),
    });

  getFilteredTodos = () => {
    const { todos, filterOption, filterOptions } = this.state;
    const filterFunc = filterOptions[filterOption].filter;
    return todos.filter(filterFunc);
  };

  render() {
    return (
      <>
        <h1>TODOIST</h1>

        <TodoInput
          name={this.state.name}
          description={this.state.description}
          onAdd={this.handleAdd}
          error={this.state.error}
          onNameChange={this.handleSetName}
          onDescriptionChange={this.handleSetDescription}
        />
        <ChipGroup
          onChipChange={this.handleSetFilterOption}
          selectedChipId={this.state.filterOption}
          chips={this.state.filterOptions}
        />
        <TodoList
          todos={this.getFilteredTodos()}
          onTodoDoneChange={this.handleSetTodoDone}
          onTodoDelete={this.handleTodoDelete}
        />
      </>
    );
  }
}
