import React from "react"
import styles from "./Todo.module.css";

export default class Todo extends React.PureComponent {
  render() {
    const { onDoneChange, done, name, description, severity, date, onDelete } = this.props

    return (
      <div className={done ? `${styles.todo} ${styles.done}`: styles.todo}>
        <div className={styles.content}>
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => onDoneChange(e.target.checked)}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.severity}>{severity}</p>
        </div>
        <button className={styles.delete} onClick={onDelete}>
          Delete
        </button>
        <p className={styles.date}>{date.toLocaleString()}</p>
      </div>
    )
  }
}
