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
    <div className="animal_card">
      <div>
        <img src={image} className='animal_image' alt={common_name} />
      </div>
      <div className='card_text'>
        <div>
          <h3>Name: {common_name}</h3>
          <p>Scientific name: {scientific_name}</p>
          <h3>Status: {species_status}</h3>
          <h4>Class: {class_name}</h4>
          <h4>Family: {family_name}</h4>
          <p>Habitat: {habitat_type}</p>
          <a href={database_link} target="_blank" rel="noopener noreferrer">See web data</a>
          <div>
            <button>
              {isLoggedIn ? <Link to={'/projects/selection'} onClick={handleSelectAnimal} animal={_id}>Donate</Link> : <Link to={'/login'}>Donate</Link>}
            </button>
          </div>
        </div>
        <div className='population_text'>
          <h3>{population.toLocaleString("it-IT")}</h3>
        </div>
      </div>
    </div>
  )
}
