import React from "react"
import MultipleChipGroup from "./ui/MultipleChipGroup.jsx"

export default class SeverityFilter extends React.PureComponent {
  getSeverities = () =>
    [...new Set(this.props.todos.map((t) => t.severity.id))]
      .sort((a, b) => a.localeCompare(b))
      .map((id) => this.props.severities.find((s) => s.id === id))

  render() {
    const availableSeverities = this.getSeverities()

    return (
      <>
        <p className="title">Severity</p>
        <MultipleChipGroup
          chips={availableSeverities}
          selectedChipIds={this.props.severityFilters}
          onChipSelect={this.props.onChipSelect}
          onChipDeselect={this.props.onChipDeselect}
        />
      </>
    )
  }
}
