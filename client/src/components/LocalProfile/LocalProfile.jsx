import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LocalProfile() {
  const params = useParams();
  useEffect(() => {
    fetch('http://localhost:4000/api/getInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: params.id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      <h1>Профиль {params.id}</h1>
    </div>
  );
}

export default LocalProfile;
