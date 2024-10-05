import React from "react"
import styles from "./Button.module.css"

export default class Button extends React.PureComponent {
  render() {
    const { name, onClick } = this.props

    return (
      <button className={styles.button} onClick={onClick}>
        {name}
      </button>
    )
  }
}
