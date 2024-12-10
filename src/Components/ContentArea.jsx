import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/lib/css/tabulator.min.css'; 

//Column

const columns = [
    { title: 'TaskID', field: 'id',width: 100 },
    { title: 'Title', field: 'Title',editor: 'input' },
    { title: 'Description', field: 'Description' ,editor: 'input'},
    { title: 'Status',field:'Status',editor:'Select',editorParams:{
        values: ['To Do', 'In Progress', 'Done'], 
      },}

  ];
const ContentArea = () => {
  const [data, setData] = useState([]);
// Fetching Data from API
  const getData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      // Directly access response.data
      setData(response.data);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   
  };

  useEffect(() => {
    getData();
    console.log(data)
  }, []);

  return (
    <div>
      Task Manager
      <ReactTabulator data={data} columns={columns} />
    </div>
  );
};

export default ContentArea;
