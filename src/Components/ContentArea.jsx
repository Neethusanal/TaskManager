import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

const ContentArea = () => {
//    colums 
    const columns = [
        { title: 'Task ID', field: 'id', width: 100 },
        { title: 'Title', field: 'title', editor: 'input' },
        { title: 'Description', field: 'description', editor: 'input' },
        {
            title: 'Status',
            field: 'status',
            editor: 'select',
            editorParams: {
                values: ['To Do', 'In Progress', 'Done'],
            },
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
                status: task.completed === true ? 'Done' : task.completed === false ? 'To Do' : 'In Progress',
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

  

    return (
        <div>
            <h1>Task Manager</h1>
            <ReactTabulator data={data} columns={columns} layout="fitData" />
        </div>
    );
};

export default ContentArea;
