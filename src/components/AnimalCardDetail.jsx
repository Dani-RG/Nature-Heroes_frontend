import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimalCardDetail({ animal, handleAnimal }) {
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

    // HACER LIFT STATE UP DEL ANIMAL ID, HACIA EL APP.JS
    const handleSelectAnimal = () => {
    handleAnimal(_id)
  }
  
  return (
    <div className="AnimalCardResume">
      <img src={image} width={'300px'} alt={common_name} />
      <h3>{common_name}</h3>
      <p>{scientific_name}</p>
      <h3>{population}</h3>
      <h3>{species_status}</h3>
      <h4>{class_name}</h4>
      <h4>{family_name}</h4>
      <p>{habitat_type}</p>
      <p>{database_link}</p>
      <button><Link to={'/projects'} onClick={handleSelectAnimal} animal={_id}> Donate </Link></button>
    </div>
  )
}
