import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import animalService from '../services/animalService';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export default function AnimalEdit() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

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
      toast.success('Animal edited!')
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit();
  }

  const handleDeleteAnimal = async (animalId) => {
    try {
      await animalService.deleteAnimal(animalId);
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/animals')
      toast.success('Animal record deleted!')
    }
  }

  return (
    <div className='card_container'>
      {animal && <><img src={animal.image} className='animal_image' alt={animal.common_name} />
      <br></br>
      <h2 className='bigger_text bolder_text'>Edit animal:</h2>
      <br></br>
       <form onSubmit={handleSubmit} className='edit_form'>
    
        <label>Common name:</label>
        <input type='text' name='common_name' value={animal.common_name} onChange={handleChange} required />

        <label>Scientific name:</label>
        <input type='text' name='scientific_name' value={animal.scientific_name} onChange={handleChange} required />

        <label>Class:</label>
        <input type='text' name='class_name' value={animal.class_name} onChange={handleChange} required />

        <label>Family:</label>
        <input type='text' name='family_name' value={animal.family_name} onChange={handleChange} required />
        
        <label>Habitat type:</label>
        <textarea rows='3' cols='33' name='habitat_type' value={animal.habitat_type} onChange={handleChange} required />

        <label>Population:</label>
        <input type='number' name='population' value={animal.population} onChange={handleChange}  required />

        <label>Species status:</label>
        <input type='text' name='species_status' value={animal.species_status} onChange={handleChange}  required />

        <label>Image:</label>
        <input type='text' name='image' value={animal.image} onChange={handleChange} required />

        <label>Database link:</label>
        <input type='text' name='database_link' value={animal.database_link} onChange={handleChange} required />

        <button type='submit' className='green_btn'>Save changes</button>
      </form></>}
      {isLoggedIn && user.role === 'admin' && <button onClick={()=>handleDeleteAnimal(animalId)} className='red_btn'>Delete</button>}
      <br></br>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
