import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimalCardResume({ animal }) {
  const { image, common_name, scientific_name, population, _id } = animal;

  return (
    <div className="AnimalCardResume">
      <img src={image} alt={common_name} />
      <h3>{common_name}</h3>
      <p>{scientific_name}</p>
      <h3>{population}</h3>
      <button className="btn"><Link to={`/animals/${_id}`}>More details</Link></button>
    </div>
  )
}
