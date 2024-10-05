import React from "react"
import styles from "./Chip.module.css"

export default class Chip extends React.PureComponent {
  handleClick = () => this.props.onClick(this.props.id)

  render() {
    const { selected, name } = this.props

    return (
      <div
        className={selected ? `${styles.chip} ${styles.selected}` : styles.chip}
        onClick={this.handleClick}
      >
        {name}
      </div>
    )
  }
}
