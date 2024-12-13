import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContentArea from './ContentArea';
import SubNavbar from './Subnavbar';

const Taskmanager = () => {
    const [data, setData] = useState([]); // All tasks
  const [filteredData, setFilteredData] = useState([]); // Filtered tasks
  const [filter, setFilter] = useState("All");

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

  const handleAddTask = () => {
    // Add a new task (example logic)
    const newTask = {
      id: data.length + 1,
      title: `New Task ${data.length + 1}`,
      description: `Task description for New Task ${data.length + 1}`,
      status: "To Do",
    };
    setData((prev) => [...prev, newTask]);
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
  </div>
  )
}

export default Taskmanager