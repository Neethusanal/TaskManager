import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarArea from '../Components/NavbarArea';
import './Layout.css'


const Layout = () => {
  return (
    <div className="layout-container">
      {/* Main Navbar */}
      <NavbarArea />

      <div className="main-layout">
        {/* Sub-navbar for Task Manager and Buttons */}
        <div className="sub-navbar">
          <h2 className="task-heading">Task Manager</h2>
          <div className="action-buttons">
            <button onClick={() => console.log('Add Task')} className="btn">Add</button>
            <select
            //   value={statusFilter}
            //   onChange={handleFilterChange}
              className="filter-dropdown"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
