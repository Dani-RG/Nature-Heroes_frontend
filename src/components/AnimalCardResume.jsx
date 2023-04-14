import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimalCardResume({ animal }) {
  const { image, common_name, scientific_name, population, _id } = animal;

  return (
    <div className='animal_card'>
      <div>
        <Link to={`/animals/${_id}`}>
          <img src={image} className='animal_image' alt={common_name} />
        </Link>
      </div>
      <div className='card_text'>
        <div>
          <h3>{common_name}</h3>
          <p>{scientific_name}</p>
        </div>
        <div className='population_text'>
          <h3>{population.toLocaleString("it-IT")}</h3>
        </div>
      </div>
    </div>
  )
}
