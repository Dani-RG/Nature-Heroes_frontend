import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimalCardResume({ animal }) {
  const { image, common_name, scientific_name, population, _id } = animal;

  return (
    <div className="animal_card_resume">
      <Link to={`/animals/${_id}`}>
        <img src={image} width={'400px'} alt={common_name} />
      </Link>
      <h3>{common_name}</h3>
      <p>{scientific_name}</p>
      <h3>{population.toLocaleString("it-IT")}</h3>
    </div>
  )
}
