import React from "react";
import FilterOption from "./FilterOption.jsx"
import "./FilterOptionList.css";

export default class FilterOptionList extends React.Component {
  render() {
    const { filterOptions, onFilterOptionChange, filterOption } = this.props;
    return (
      <div className="filter-options">
        <p>Filter</p>
        <div>
          {Object.entries(filterOptions).map(([key, obj]) => (
            <FilterOption
              key={key}
              selected={key === filterOption}
              name={obj.name}
              onClick={() => onFilterOptionChange(key)}
            />
          ))}
        </div>
      </div>
    );
  }
}
