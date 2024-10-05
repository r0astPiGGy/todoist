import React from "react"
import commonStyles from "../common.module.css"
import styles from "./TodoInput.module.css"
import TextField from "./ui/TextField.jsx"
import Button from "./ui/Button.jsx"
import ChipGroup from "./ui/ChipGroup.jsx"
import Spacer from "./ui/Spacer.jsx"

export default class TodoInput extends React.Component {
  handleAdd = () =>
    this.props.onAdd(
      this.props.name,
      this.props.description,
      this.props.selectedSeverity
    )

  handleNameChange = (name) => this.props.onNameChange(name)

  handleDescriptionChange = (description) =>
    this.props.onDescriptionChange(description)

  handleSeverityChange = (severityId) => this.props.onSeverityChange(severityId)

  render() {
    const { name, description, error, selectedSeverity, severityList } =
      this.props

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "0.25rem",
        }}
      >
        <div style={{ width: "100%" }} className={commonStyles.grid}>
          <div></div>

          <p style={{ color: "red" }}>{error || <br />}</p>
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
          <p>Task severity</p>
          <ChipGroup
            chips={severityList}
            onChipChange={this.handleSeverityChange}
            selectedChipId={selectedSeverity}
          />

          <div></div>

          <Button name="Add" onClick={this.handleAdd} />
        </div>
      </div>
    )
  }
}
