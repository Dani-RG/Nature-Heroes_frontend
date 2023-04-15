import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function AnimalCardDetail({ animal, handleAnimal }) {
  const { isLoggedIn, user } = useContext(AuthContext); 
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
    <div className="animal_card detail">
      <div>
        <img src={image} className='animal_image' alt={common_name} />
      </div>
      <div className='card_details'>

        <div className='details_text'>
          <p>Population: </p>
          <p>Name:</p>
          <p>{common_name}</p>
          <p>Scientific name:</p>
          <p>{scientific_name}</p>
          <p>Status:</p>
          <p>{species_status}</p>
          <p>Class:</p>
          <p>{class_name}</p>
          <p>Family:</p>
          <p>{family_name}</p>
          <p>Habitat:</p>
          <p>{habitat_type}</p>
          <a href={database_link} target="_blank" rel="noopener noreferrer">See web data</a>
        </div>

        <div className='details_text'>
          <p className='animal_population bigger_text'>{population.toLocaleString("it-IT")}</p>
        </div>

      </div>

      <div className='donate_btn'>
        <button>
          {isLoggedIn ? <Link to={'/projects/selection'} onClick={handleSelectAnimal} animal={_id}>Donate</Link> : <Link to={'/login'}>Donate</Link>}
        </button>
      </div>

      <div className='btn'>
        {isLoggedIn && user.role === 'admin' && <button><Link to={`/animals/edit/${_id}`}>Edit</Link></button>}
      </div>

    </div>
  )
}
