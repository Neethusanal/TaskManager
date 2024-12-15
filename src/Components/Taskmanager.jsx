import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContentArea from './ContentArea';
import SubNavbar from './Subnavbar';
import './Taskmanager.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Taskmanager = () => {
    const [data, setData] = useState([]); // All tasks
  const [filteredData, setFilteredData] = useState([]); // Filtered tasks

//   const [searchTerm, setSearchTerm] = useState(""); 
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "To Do",
  });
//API FETCHING
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const tasks = response.data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: `Task description for ${task.title}`,
          status: task.completed ? "Done" : "To Do",
        }));
        setData(tasks);
        setFilteredData(tasks); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
   
    if (filter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((task) => task.status === filter));
    }
  }, [filter, data]);

  const handleDelete = (id) => {
    // Filter out the task with the given ID
    const updatedData = data.filter((task) => task.id !== id);
    
    // Re-index the tasks by setting the ID sequentially
    const reIndexedData = updatedData.map((task, index) => ({
      ...task,
      id: index + 1, // Set the new id starting from 1
    }));
  
    // Update the state with the new, re-indexed data
    setData(reIndexedData);
    setFilteredData(reIndexedData);
  
    // Display success message
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The task has been deleted successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  };
  
  
 
  // Add new task
  const handleAddTask = () => {
    setIsModalOpen(true);
  };
  
  const handleSubmitNewTask = () => {
    if (!newTask.title || !newTask.description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields!',
      });
      return;
    }
  
    const updatedTask = {
      ...newTask,
      id: data.length + 1, // Assign a new ID
    };
  
    const updatedData = [updatedTask, ...data];
    setData(updatedData);
    setFilteredData(updatedData); // Update both states
    setIsModalOpen(false);
    setNewTask({ id: "", title: "", description: "", status: "To Do" });
  
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'New task added successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); // Update filter state
  };

  const handleEdit = (updatedData) => {
    const updatedDataList = data.map((task) =>
        task.id === updatedData.id ? { ...task, ...updatedData } : task
    );
    setData(updatedDataList);  // Update task data
    setFilteredData(updatedDataList);  // Update filtered data for display
};

  return (
    <div>
    {/* SubNavbar with Add and Filter */}
    <SubNavbar onAdd={handleAddTask} onFilterChange={handleFilterChange} />

    {/* ContentArea to display data */}
    <ContentArea data={filteredData} onDelete={handleDelete} onEdit={handleEdit} />
{/* Modal for adding new Task */}
{isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-canvas">
      <h3>Add New Task</h3>

      {/* Task Title */}
      <label>Title:</label>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Enter task title"
      />

      {/* Task Description */}
      <label>Description:</label>
      <input
        type="text"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Enter task description"
      />

      {/* Task Status */}
      <label>Status:</label>
      <select
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Action Buttons */}
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={handleSubmitNewTask}>
          Add Task
        </button>
        <button className="btn btn-danger" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

  </div>
  )
}

export default Taskmanager