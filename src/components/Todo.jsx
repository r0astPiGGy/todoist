import React from "react"
import styles from "./Todo.module.css"

export default class Todo extends React.PureComponent {

  handleDoneChange = (e) => this.props.onDoneChange(this.props.id, e.target.checked)

  handleTodoDelete = () => this.props.onDelete(this.props.id)

  render() {
    const { done, name, description, severity, date } =
      this.props

    return (
      <div className={done ? `${styles.todo} ${styles.done}` : styles.todo}>
        <div className={styles.content}>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleDoneChange}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.severity}>{severity}</p>
        </div>
        <button className={styles.delete} onClick={this.handleTodoDelete}>
          Delete
        </button>
        <p className={styles.date}>{date.toLocaleString()}</p>
      </div>
    )
  }
}
