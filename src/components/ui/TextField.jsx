import React from "react"
import styles from "./TextField.module.css"

export default class TextField extends React.PureComponent {
  handleValueChange = (e) => this.props.onValueChange(e.target.value)

  render() {
    const { value, multiline, placeholder } = this.props

    return (
      <>
        {multiline ? (
          <textarea
            className={styles["text-field"]}
            value={value}
            placeholder={placeholder}
            onChange={this.handleValueChange}
          />
        ) : (
          <input
            className={styles["text-field"]}
            value={value}
            type="text"
            placeholder={placeholder}
            onChange={this.handleValueChange}
          />
        )}
      </>
    )
  }
}
