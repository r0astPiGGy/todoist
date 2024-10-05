import React from "react";
import "./FilterOptionList.css";

export default class FilterOption extends React.Component {
    render() {
      const { selected, name, onClick } = this.props;
  
      return (
        <div
          className={selected ? "option selected" : "option"}
          onClick={onClick}
        >
          {name}
        </div>
      );
    }
  }