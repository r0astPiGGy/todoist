import React from "react";
import "./TodoInput.css";

export default class TodoInput extends React.Component {
  render() {
    const {
      name,
      description,
      onNameChange,
      onDescriptionChange,
      onAdd,
      error,
    } = this.props;

    return (
      <>
        <p className="error">{error || <br/>}</p>
        <div className="grid">
          <input
            onChange={(e) => onNameChange(e.target.value)}
            value={name}
            placeholder="Task name"
          />
          <button onClick={() => onAdd(name, description)}>Add</button>
          <textarea
            onChange={(e) => onDescriptionChange(e.target.value)}
            value={description}
            placeholder="Task description"
          />
        </div>
      </>
    );
  }
}
