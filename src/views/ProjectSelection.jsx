import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import projectService from '../services/projectService';
import animalService from '../services/animalService';

export default function ProjectSelection({ animalId }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [animal, setAnimal] = useState(null);

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setLoading(false);
      setError(false);
      setFilteredProjects(response.filter(elem => elem.animal === animalId));
    } catch (error) {
      console.error(error)
      setLoading(false);
      setError(true);
    }
  }

  const getAnimal = async () => {
    try {
      const response = await animalService.getAnimal(animalId);
      setLoading(false);
      setAnimal(response);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
      setError(true)
    }
  }

  useEffect(() => {
    getProjects();
    getAnimal();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className='container_centered'>
        {loading && <p>Loading...</p>}
        {!loading && filteredProjects.length > 0 &&
          <div>
            <p className='bigger_text'>Donate to:</p>
            <p className='bolder_text small_margin'>{animal.common_name}</p>
            <img src={animal.image} className='animal_image' alt={animal.name} />

            <p className='bigger_text small_margin'>Select a foundation:</p>
            <div className='container_wrap'>
              {filteredProjects.map(elem => {
                return (
                  <div key={elem._id} className='foundation_card'>
                    <Link to={`/projects/selection/donations/${elem._id}`}>
                      <img src={elem.foundation.logo} className='foundation_image' alt={elem.foundation.acronym} />
                      <p>{elem.foundation.name}</p>
                    </Link>
                  </div>
                )
              })}
            </div>

          </div>}
        {error && <p>Something went wrong.</p>}
      </div>
      <Outlet />
    </div>
  )
}
