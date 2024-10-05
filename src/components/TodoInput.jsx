import React from "react"
import commonStyles from "../common.module.css"
import TextField from "./ui/TextField.jsx"
import Button from "./ui/Button.jsx"

export default class TodoInput extends React.Component {
  handleAdd = () => this.props.onAdd(this.props.name, this.props.description)

  handleNameChange = (e) => this.props.onNameChange(e.target.value)

  handleDescriptionChange = (e) =>
    this.props.onDescriptionChange(e.target.value)

  render() {
    const { name, description, error } = this.props

    return (
      <>
        <p style={{ color: "red", marginBottom: "0.25rem" }}>
          {error || <br />}
        </p>
        <div className={commonStyles.grid}>
          <p>Task name</p>
          <TextField
            onValueChange={this.handleNameChange}
            value={name}
            placeholder="Task name"
          />
          <p>Task description</p>
          <TextField
            onValueChange={this.handleDescriptionChange}
            value={description}
            placeholder="Task description"
            multiline
          />
        </div>
        <Button name="Add" onClick={this.handleAdd} />
      </>
    )
  }
}
