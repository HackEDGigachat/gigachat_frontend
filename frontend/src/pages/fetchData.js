import React, { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello from the frontend!',
        }),
      });
      const responseData = await response.json();
      setData(responseData.received_data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data ? `Received data: ${JSON.stringify(data)}` : 'No data received yet'}
    </div>
  );
}

export default FetchData;