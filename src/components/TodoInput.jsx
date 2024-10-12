import React from "react"
import commonStyles from "../common.module.css"
import styles from "./TodoInput.module.css"
import TextField from "./ui/TextField.jsx"
import Button from "./ui/Button.jsx"
import ChipGroup from "./ui/ChipGroup.jsx"

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      severityId: props.severityList[0].id,
      error: "",
    }
  }

  render() {
    const { severityList } = this.props
    const { error, name, description, severityId } = this.state

    return (
      <div className={styles.todoInput}>
        <div style={{ width: "100%" }} className={commonStyles.grid}>
          <div></div>
          <p className={styles.error}>{error || <br />}</p>

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
            selectedChipId={severityId}
          />

          <div></div>
          <Button name="Add" onClick={this.handleAdd} />
        </div>
      </div>
    )
  }

  handleAdd = () => {
    const { name, description, severityId } = this.state

    if (!name) {
      this.setState({ error: "Task name cannot be empty" })
      return
    }
    if (name.startsWith(" ")) {
      this.setState({
        error: "Task name should not start with a whitespace",
      })
      return
    }
    if (name.endsWith(" ")) {
      this.setState({
        error: "Task name should not end with a whitespace",
      })
      return
    }

    this.props.onAdd(name, description, severityId)
    this.setState({
      name: "",
      description: "",
      error: null,
    })
  }

  handleNameChange = (name) => this.setState({ name, error: "" })

  handleDescriptionChange = (description) => this.setState({ description, error: "" })

  handleSeverityChange = (severityId) => this.setState({ severityId, error: "" })
}
