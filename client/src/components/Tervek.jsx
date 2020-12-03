import React, { useEffect, useState } from 'react';

function Tervek(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});    

    useEffect(() => {
        setLoading(true);
        fetch('/files/' + props.match.params.fileID)
            .then((response) => response.json())
            .then((datas) => {
                setLoading(false);
                setData(datas);
            })
            .catch((e) => {
                setLoading(false);
                setError('fetch failed');
            });
    }, []);

    if (loading) {
        return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
    }

    if (error !== '') {
        return <p>ERROR: {error}</p>;
    }

    return (
        <div>            
            <h2 key={data.id}>Name: {data.name}, id: {data.id}</h2>;            
        </div>
    );
}

export default Tervek;
