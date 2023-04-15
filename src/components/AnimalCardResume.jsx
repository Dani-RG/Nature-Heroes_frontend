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
        <div className='animal_names'>
          <p className='animal_common'>{common_name}</p>
          <p className='animal_scientific'>{scientific_name}</p>
        </div>
        <div className='animal_population'>
          <p>{population.toLocaleString("it-IT")}</p>
        </div>
      </div>
    </div>
  )
}
