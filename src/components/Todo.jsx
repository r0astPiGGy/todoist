import React from "react"
import "./Todo.css";

export default class Todo extends React.Component {
  render() {
    const { onDoneChange, done, name, description, date, onDelete } = this.props

    return (
      <div className={done ? "todo done" : "todo"}>
        <div className="content">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => onDoneChange(e.target.checked)}
          />
          <p className="name">{name}</p>
          <p className="description">{description}</p>
        </div>
        <button className="delete" onClick={onDelete}>
          Delete
        </button>
        <p className="date">{date.toLocaleString()}</p>
      </div>
    )
  }
}
