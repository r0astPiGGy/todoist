import React from "react"
import Chip from "./Chip.jsx"
import styles from "./ChipGroup.module.css"

export default class MultipleChipGroup extends React.PureComponent {

  handleChipClick = (chipId) => {
    const { onChipSelect, onChipDeselect, selectedChipIds } = this.props

    if (selectedChipIds.includes(chipId)) {
      onChipDeselect(chipId)
    } else {
      onChipSelect(chipId)
    }
  }

  render() {
    const { chips, selectedChipIds } = this.props
    return (
      <div className={styles["chip-group"]}>
        {chips.map((obj) => (
          <Chip
            id={obj.id}
            key={obj.id}
            selected={selectedChipIds.includes(obj.id)}
            name={obj.name}
            onClick={this.handleChipClick}
          />
        ))}
      </div>
    )
  }
}
