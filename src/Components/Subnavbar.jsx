import React from "react";

const SubNavbar = ({ onAdd, onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value); // Pass selected filter back to parent
  };

  return (
    <div className="sub-navbar">
      <h2 className="task-heading">Task Manager</h2>
      <div className="action-buttons">
        <button className="btn" onClick={onAdd}>
          Add
        </button>
        <select className="filter-dropdown" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default SubNavbar;
