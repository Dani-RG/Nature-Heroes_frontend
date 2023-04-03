import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';

export default function Projects({ animal }) {
console.log(animal)

  const { _id } = animal;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProjects();
  }, [])
  console.log(projects)

  const filteredProjects = projects.filter(elem => elem.animal === '642878e1eaa0ad8cf8cc9fe8'); //_id
  console.log(filteredProjects)

  // POPULATE DE FOUNDATIONS EN LOS PROJECTS

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && filteredProjects &&
        (<div className="projects-list">
            {filteredProjects.map(elem => {
              return (
                <div key={elem._id}>
                  <Link to={`/donations/${elem._id}`}>
                    <p>{elem.foundation}</p>
                    <img src={elem.foundation.logo} width={'50px'} alt={elem.foundation.acronym} />
                  </Link>
                </div>
              )
            })} 
        </div>)}
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
