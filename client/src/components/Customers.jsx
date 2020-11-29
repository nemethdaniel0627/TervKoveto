import React, { useEffect, useState } from 'react';
// import { Link, Route, Router, Switch } from "react-router-dom";

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
    return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
  }

  if (error !== '') {
    return <p>ERROR: {error}</p>;
  }

  function redirect() {
    // <Link to="asd"></Link>
  }

  return (
    // <Router>
      <div>
        <h2>Customers</h2>
        <ul>
          {data.map(element => {
            return <li key={element.id}>{element.firstName} {element.lastName}</li>
          })}
        </ul>
        {/* <button><Link to="asd">Katt ide</Link></button> */}

        {/* <Switch>
          <Route path="asd">
            <Asd />
          </Route>
        </Switch> */}
      </div>
    // </Router>
  );
}

function Asd(){
  return <h2>Szia</h2>
}

export default Customers;
