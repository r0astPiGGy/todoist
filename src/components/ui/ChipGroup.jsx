import React from "react"
import Chip from "./Chip.jsx"
import styles from "./ChipGroup.module.css"

export default class ChipGroup extends React.PureComponent {
  render() {
    const { chips, onChipChange, selectedChipId } = this.props
    return (
      <div className={styles["chip-group"]}>
        {chips.map((obj) => (
          <Chip
            id={obj.id}
            key={obj.id}
            selected={obj.id === selectedChipId}
            name={obj.name}
            onClick={onChipChange}
          />
        ))}
      </div>
    )
  }
}
