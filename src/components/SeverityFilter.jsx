import React from "react"
import MultipleChipGroup from "./ui/MultipleChipGroup.jsx"
import {
  getSeveritiesFromTodos,
  filterAbsentSeverities,
  mapIdToSeverity,
} from "../utils.js"

export default class SeverityFilter extends React.PureComponent {
  getSelectedSeverities = () => getSeveritiesFromTodos(this.props.todos).sort()

  render() {
    const allSeverities = this.getSelectedSeverities()
    const selectedSeverities = filterAbsentSeverities(
      allSeverities,
      this.props.selectedSeverityIds
    )

    return (
      <>
        <p className="title">Severity</p>
        <MultipleChipGroup
          chips={allSeverities.map(mapIdToSeverity)}
          selectedChipIds={selectedSeverities}
          onChipSelect={this.props.onSeveritySelect}
          onChipDeselect={this.props.onSeverityDeselect}
        />
      </>
    )
  }
}
