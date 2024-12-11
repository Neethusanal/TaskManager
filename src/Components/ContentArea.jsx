import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

const ContentArea = () => {
//  

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            const tasks = response.data.slice(0, 20).map((task) => ({
                id: task.id,
                title: task.title,
                description: `Task description for ${task.title}`,
                status: task.completed ? 'Done' : 'To Do',
            }));
            setData(tasks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }; 

    const handleDelete = (id) => {
        const updatedData = data.filter((task) => task.id !== id);
        setData(updatedData);
    };

    //colums 
    const columns = [
        { title: 'Task ID', field: 'id', width: 100 },
        { title: 'Title', field: 'title', editor: 'input' },
        { title: 'Description', field: 'description', editor: 'input' },
        {
            title: 'Status',
            field: 'status',
            formatter: (cell) => {
                const rowData = cell.getRow().getData();
                const select = document.createElement('select');
    
                // Options for the dropdown
                ['To Do', 'In Progress', 'Done'].forEach((option) => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    opt.selected = option === rowData.status; // Pre-select the current status
                    select.appendChild(opt);
                });
    
                // Handle dropdown change
                select.addEventListener('change', (event) => {
                    const newStatus = event.target.value;
                    rowData.status = newStatus; // Update the status in the row's data
                    console.log(`Row ID: ${rowData.id}, New Status: ${newStatus}`);
                    // Optionally, update the component state or API call here
                    cell.getRow().update(rowData); // Update the row with the new data
                });
    
                return select;
            },
            width: 150,
            hozAlign: 'center',
        },
        {
            title: 'Actions',
            field: 'actions',
            formatter: (cell) => {
                const button = document.createElement('button');
                button.className = 'btn btn-danger btn-sm';
                button.textContent = 'Delete';
                button.onclick = () => {
                    const rowData = cell.getRow().getData();
                    handleDelete(rowData.id);
                };
                return button;
            },
            width: 100,
            hozAlign: 'center',
        },
    ];



    return (
        <div>
            <h1>Task Manager</h1>
            <ReactTabulator data={data} columns={columns} layout="fitData" />
        </div>
    );
};

export default ContentArea;
