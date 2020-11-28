import React, { useEffect, useState } from 'react';

function Customers() {  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((e) => {
        setLoading(false);
        setError('fetch failed');
      });
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  if (error !== '') {
    return <p>ERROR: {error}</p>;
  }  

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {data.map(element =>{
          return <li key={element.id}>{element.firstName} {element.lastName}</li>
        })}
      </ul>
    </div>
  );
}

export default Customers;
