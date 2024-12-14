import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContentArea from './ContentArea';
import SubNavbar from './Subnavbar';
import './Taskmanager.css'

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

  useEffect(() => {
    // Fetch data from API when the component mounts
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
    // Apply filtering logic whenever filter or data changes
    if (filter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((task) => task.status === filter));
    }
  }, [filter, data]);

  const handleDelete = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);
  };
 
  // Add new task
  const handleAddTask = () => {
    setIsModalOpen(true);
  };
  
  const handleSubmitNewTask = () => {
    if (!newTask.title || !newTask.description) return;

    const updatedTask = {
      ...newTask,
      id: data.length + 1, // Assign a new ID
    };

    const updatedData = [updatedTask, ...data];
    setData(updatedData);
    setFilteredData(updatedData); // Update both states
    setIsModalOpen(false);
    setNewTask({ id: "", title: "", description: "", status: "To Do" });
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); // Update filter state
  };


  return (
    <div>
    {/* SubNavbar with Add and Filter */}
    <SubNavbar onAdd={handleAddTask} onFilterChange={handleFilterChange} />

    {/* ContentArea to display data */}
    <ContentArea data={filteredData} onDelete={handleDelete}/>
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