import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarArea from '../Components/NavbarArea';
import './Layout.css'


const Layout =({ setFilter }) => {
    const [statusFilter, setStatusFilter] = useState('All'); // Default filter is "All"

    const handleFilterChange = (event) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        setFilter(selectedStatus); // Pass filter status to the parent or ContentArea
      };
  return (
    <div className="layout-container">
      {/* Main Navbar */}
      <NavbarArea />

      <div className="main-layout">
        {/* Sub-navbar for Task Manager and Buttons */}
        

        {/* Content Area */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
