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

  // const handleFilterProjects = () => {
  //   const filteredProjects = projects.filter(elem => elem.animal === _id);
  //   setProjects(filteredProjects);
  // }

  const filteredProjects = projects.filter(elem => elem.animal === _id);
  console.log(filteredProjects)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && filteredProjects &&
        (<div className="projects-list">
            {filteredProjects.map(elem => {
              return (
                <ul>
                  <li><Link to={`/donations/${elem._id}`}>elem.foundation.logo</Link></li>
                </ul>
              )
            })} 
        </div>)}
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
