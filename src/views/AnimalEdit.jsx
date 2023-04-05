import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import animalService from '../services/animalService';

export default function AnimalEdit() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getAnimal = async () => {
    try {
      const response = await animalService.getAnimal(animalId);
      setAnimal(response)
      setError(false)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getAnimal();
    // eslint-disable-next-line
  }, [animalId]);

  const handleChange = (e) => {
    setAnimal(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleEdit = async () => {
    try {
      await animalService.editAnimal(animalId, animal);
      navigate(`/animals/${animalId}`)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit();
  }

  return (
    <div>
      <img src={animal.image} width={'300px'} alt={animal._id} />
      <h2>Edit animal</h2>
       <form onSubmit={handleSubmit}>

        <label> Common name: </label>
        <input type='text' name='common_name' value={animal.common_name} onChange={handleChange} required />

        <label> Scientific name: </label>
        <input type='text' name='scientific_name' value={animal.scientific_name} onChange={handleChange} required />

        <label> Class: </label>
        <input type='text' name='class_name' value={animal.class_name} onChange={handleChange} required />

        <label> Family: </label>
        <input type='text' name='family_name' value={animal.family_name} onChange={handleChange} required />
        
        <label> Habitat type: </label>
        <input type='text' name='habitat_type' value={animal.habitat_type} onChange={handleChange} required />

        <label> Population: </label>
        <input type='number' name='population' value={animal.population} onChange={handleChange}  required />

        <label> Species status: </label>
        <input type='text' name='species_status' value={animal.species_status} onChange={handleChange}  required />

        <label> Image: </label>
        <input type='text' name='image' value={animal.image} onChange={handleChange} required />

        <label> Database link: </label>
        <input type='text' name='database_link' value={animal.database_link} onChange={handleChange} required />

        <button type='submit'>Save changes</button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
