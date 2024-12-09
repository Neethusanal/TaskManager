import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentArea = () => {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div>
      <h1>Content Area</h1>
      <ul>
        {/* Render the fetched data */}
        {data.map((item) => (
          <li key={item.id}>
            {item.title} - {item.completed ? 'Done' : 'To Do'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentArea;
