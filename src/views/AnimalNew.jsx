import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import animalService from '../services/animalService';
import toast from 'react-hot-toast';

export default function AnimalNew() {
  const initialState = {
    common_name: '',
    scientific_name: '',
    class_name: '',
    family_name: '',
    habitat_type: '',
    population: '',
    species_status: '',
    image: '',
    database_link: ''
  }
  const [newAnimal, setNewAnimal] = useState(initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setNewAnimal(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCreate = async () => {
    try {
      const createdAnimal = await animalService.createAnimal(newAnimal);
      setNewAnimal(initialState);
      setError(false)
      navigate(`/animals/${createdAnimal._id}`)
      toast.success('Animal registered!')
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  }

  return (
    <div>
      <h2>Register new animal</h2>
      <form onSubmit={handleSubmit}>
        <label>Common name:</label>
        <input type='text' name='common_name' value={newAnimal.common_name} onChange={handleChange} required />

        <label>Scientific name:</label>
        <input type='text' name='scientific_name' value={newAnimal.scientific_name} onChange={handleChange} required />

        <label>Class:</label>
        <input type='text' name='class_name' value={newAnimal.class_name} onChange={handleChange} required />

        <label>Family:</label>
        <input type='text' name='family_name' value={newAnimal.family_name} onChange={handleChange} required />

        <label>Habitat type:</label>
        <textarea rows='5' cols='33' name='habitat_type' value={newAnimal.habitat_type} onChange={handleChange} required />

        <label>Population:</label>
        <input type='number' name='population' value={newAnimal.population} onChange={handleChange} required />

        <label>Species status:</label>
        <input type='text' name='species_status' value={newAnimal.species_status} onChange={handleChange} required />

        <label>Image:</label>
        <input type='text' name='image' value={newAnimal.image} onChange={handleChange} required />

        <label>Database link:</label>
        <input type='text' name='database_link' value={newAnimal.database_link} onChange={handleChange} required />
          
        <button type='submit'>Submit</button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
