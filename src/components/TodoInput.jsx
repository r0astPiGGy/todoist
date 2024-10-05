import React from "react"
import "./TodoInput.css"

export default class TodoInput extends React.Component {

  handleAdd = () => this.props.onAdd(this.props.name, this.props.description)

  handleNameChange = (e) => this.props.onNameChange(e.target.value)

  handleDescriptionChange = (e) => this.props.onDescriptionChange(e.target.value)

  render() {
    const {
      name,
      description,
      error,
    } = this.props

    return (
      <>
        <p className="error">{error || <br />}</p>

        <div className="todo-input grid">
          <p>Task name</p>
          <input
            onChange={this.handleNameChange}
            value={name}
            placeholder="Task name"
          />
          <p>Task description</p>
          <textarea
            onChange={this.handleDescriptionChange}
            value={description}
            placeholder="Task description"
          />
        </div>
        <button onClick={this.handleAdd}>Add</button>
      </>
    )
  }
}
