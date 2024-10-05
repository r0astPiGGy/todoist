import React from "react"
import "./Chip.css"

export default class Chip extends React.Component {
  handleClick = () => this.props.onClick(this.props.id)

  render() {
    const { selected, name } = this.props

    return (
      <div
        className={selected ? "chip selected" : "chip"}
        onClick={this.handleClick}
      >
        {name}
      </div>
    )
  }
}
