import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import foundationService from '../services/foundationService';
import animalService from '../services/animalService';
import toast from 'react-hot-toast';

export default function ProjectNew() {
  const initialState = {
    foundation: '',
    animal: ''
  }
  const [newProject, setNewProject] = useState(initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [foundations, setFoundations] = useState([]);
  const [animals, setAnimals] = useState([]);

  // GET FOUNDATIONS:
  const getFoundations = async () => {
    try {
      const response = await foundationService.getFoundations();
      setFoundations(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFoundations()
  }, [])

  // GET ANIMALS:
  const getAnimals = async () => {
    try {
      const response = await animalService.getAnimals();
      setAnimals(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnimals()
  }, [])

  // CREATE A NEW PROJECT:
  const handleChange = (e) => {
    setNewProject(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCreate = async () => {
    try {
      // eslint-disable-next-line
      const createdProject = await projectService.createProject(newProject);
      setNewProject(initialState);
      setError(false)
      navigate('/animals')
      toast.success('Project created!')
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
      <h2>Create new project</h2>
      <form onSubmit={handleSubmit}>
        <label>Foundation:</label>
        <select name='foundation' value={newProject.foundation} onChange={handleChange} required>
          <option value=''>Select a foundation</option>
          {foundations.map((foundation) => (
            <option key={foundation._id} value={foundation._id}>
              {foundation.name}
            </option>
          ))}
        </select>
        
        <label>Animal:</label>
        <select name='animal' value={newProject.animal} onChange={handleChange} required>
          <option value=''>Select an animal</option>
          {animals.map((animal) => (
            <option key={animal._id} value={animal._id}>
              {animal.common_name}
            </option>
          ))}
        </select>
          
          <button type='submit'>Submit</button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
