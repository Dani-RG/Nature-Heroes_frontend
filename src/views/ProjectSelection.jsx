import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import projectService from '../services/projectService';

export default function ProjectSelection({ animalId }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

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

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, [])

      return (
    <div>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && filteredProjects.length > 0 &&
          (<div className="projects-list">
              {filteredProjects.map(elem => {
                return (
                  <div key={elem._id}>
                    <Link to={`/projects/selection/donations/${elem._id}`}>
                      <img src={elem.foundation.logo} width={'200px'} alt={elem.foundation.acronym} />
                    </Link>
                  </div>
                )
              })} 
          </div>)}
        {error && <p>Something went wrong.</p>}
      </div>
      <Outlet />
    </div>
  )
}
