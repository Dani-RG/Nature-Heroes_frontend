import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function AnimalCardDetail({ animal, handleAnimal }) {
  const { isLoggedIn } = useContext(AuthContext); 
  const {
    _id,
    common_name,
    scientific_name,
    class_name,
    family_name,
    habitat_type,
    population,
    species_status,
    image,
    database_link
  } = animal

    const handleSelectAnimal = () => {
    handleAnimal(_id)
  }
  
  return (
    <div className="AnimalCardResume">
      <img src={image} width={'300px'} alt={common_name} />
      <h3>{common_name}</h3>
      <p>{scientific_name}</p>
      <h3>{population.toLocaleString("it-IT")}</h3>
      <h3>{species_status}</h3>
      <h4>{class_name}</h4>
      <h4>{family_name}</h4>
      <p>{habitat_type}</p>
      <a href={database_link} target="_blank" rel="noopener noreferrer">Data-webpage</a>
      <button>
      {isLoggedIn ? <Link to={'/projects/selection'} onClick={handleSelectAnimal} animal={_id}>Donate</Link> : <Link to={'/login'}>Donate</Link>}
      </button>
    </div>
  )
}
