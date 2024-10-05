import React from "react"
import Chip from "./Chip.jsx"
import "./ChipGroup.css"

export default class ChipGroup extends React.Component {
  render() {
    const { chips, onChipChange, selectedChipId } = this.props
    return (
      <div className="chip-group">
        <p>Filter</p>
        <div>
          {Object.entries(chips).map(([chipId, obj]) => (
            <Chip
              id={chipId}
              key={chipId}
              selected={chipId === selectedChipId}
              name={obj.name}
              onClick={onChipChange}
            />
          ))}
        </div>
      </div>
    )
  }
}
