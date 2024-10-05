import React from "react"
import Chip from "./Chip.jsx"
import styles from "./ChipGroup.module.css"

export default class ChipGroup extends React.Component {
  render() {
    const { chips, onChipChange, selectedChipId } = this.props
    return (
      <div className={styles["chip-group"]}>
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
    )
  }
}
