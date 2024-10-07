import React from "react"
import MultipleChipGroup from "./MultipleChipGroup.jsx"

export default class SeverityFilter extends React.PureComponent {
  
  getSeverities = () =>
    [...new Set(this.state.todos.map((t) => t.severity.id))]
      .sort((a, b) => a.localeCompare(b))
      .map((id) => this.state.severities.find((s) => s.id === id))

  render() {
    return;
  }
}