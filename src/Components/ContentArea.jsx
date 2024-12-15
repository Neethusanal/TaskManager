import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import Swal from 'sweetalert2';
import './Content.css';

const ContentArea = ({ data, onDelete, onEdit }) => {
    const [editedRow, setEditedRow] = useState(null); 

    // Columns definition
    const columns = [
        { title: 'Task ID', field: 'id' },
        { title: 'Title', field: 'title' },
        { title: 'Description', field: 'description' },
        {
            title: 'Status',
            field: 'status',
            formatter: (cell) => {
                const rowData = cell.getRow().getData();
                const select = document.createElement('select');
                ['To Do', 'In Progress', 'Done'].forEach((option) => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    opt.selected = option === rowData.status;
                    select.appendChild(opt);
                });
                select.addEventListener('change', (event) => {
                    const newStatus = event.target.value;
                    rowData.status = newStatus;
                    cell.getRow().update(rowData);
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
                const container = document.createElement('div');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'btn btn-primary btn-sm mx-1';
                editButton.onclick = () => handleEditRow(cell.getRow().getData());
                container.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.onclick = () => onDelete(cell.getRow().getData().id);
                container.appendChild(deleteButton);

                return container;
            },
            width: 150,
            hozAlign: 'center',
        },
    ];

    const handleEditRow = (rowData) => {
        setEditedRow(rowData);
      
        // Open SweetAlert2 input fields for editing
        Swal.fire({
            title: 'Edit Task',
            html: `
                <label>Title:</label>
                <input id="edit-title" class="swal2-input" value="${rowData.title}" />
                <label>Description:</label>
                <input id="edit-description" class="swal2-input" value="${rowData.description}" />
                <label>Status:</label>
                <select id="edit-status" class="swal2-select">
                    <option value="To Do" ${rowData.status === 'To Do' ? 'selected' : ''}>To Do</option>
                    <option value="In Progress" ${rowData.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Done" ${rowData.status === 'Done' ? 'selected' : ''}>Done</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: () => {
                return {
                    id: rowData.id,  // Include task ID so it can be updated
                    title: document.getElementById('edit-title').value,
                    description: document.getElementById('edit-description').value,
                    status: document.getElementById('edit-status').value,
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleSaveRow(result.value);  // Pass the updated data directly
            }
        });
    };
    
    
    const handleSaveRow = (updatedData) => {
        // Call onEdit from the parent component to update the task data
        onEdit(updatedData);
    
        Swal.fire({
            icon: 'success',
            title: 'Task Updated!',
            text: `Task with ID ${updatedData.id} has been updated successfully.`,
            timer: 2000,
            showConfirmButton: false,
        });
    };
    
    return (
        <div className="table-container">
            <ReactTabulator data={data} columns={columns} layout="fitData" />
        </div>
    );
};

export default ContentArea;
