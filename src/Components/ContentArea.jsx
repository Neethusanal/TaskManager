import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

const ContentArea = ({data, onDelete }) => {
//  
console.log(data,"kkkkkkkkkkkkkkkkkkk")

    //colums 
    const columns = [
        { title: 'Task ID', field: 'id', width: 100},
        { title: 'Title', field: 'title', editor: 'input'},
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
                    opt.selected = option === rowData.status; 
                    select.appendChild(opt);
                });
    
                // Handle dropdown change
                select.addEventListener('change', (event) => {
                    const newStatus = event.target.value;
                    rowData.status = newStatus; 
                    console.log(`Row ID: ${rowData.id}, New Status: ${newStatus}`);
                    cell.getRow().update(rowData); 
                });
    
                return select;
            },
            width: 150,
            hozAlign: 'center',
        },
        {
            title: "Actions",
            field: "actions",
            formatter: (cell) => {
              const button = document.createElement("button");
              button.className = "btn btn-danger btn-sm";
              button.textContent = "Delete";
              button.onclick = () => {
                const rowData = cell.getRow().getData();
                onDelete(rowData.id); // Call the parent-provided function
              };
              return button;
            },
            width: 100,
            hozAlign: "center",
          },
    ];



    return (
        <>
            
            <ReactTabulator data={data}columns={columns} layout="fitData "/>
        </>
    );
};

export default ContentArea;
