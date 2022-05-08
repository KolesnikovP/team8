import React from 'react';
import { useParams } from 'react-router-dom';

function LocalProfile() {
  const params = useParams();
  return (
    <div>
      <h1>Профиль {params.id}</h1>
    </div>
  );
}

export default LocalProfile;
