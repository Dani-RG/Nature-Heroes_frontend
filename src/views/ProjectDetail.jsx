import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const getProject = async () => {
    try {
      const response = await projectService.getProject(projectId);
      setLoading(false);
      setProject(response);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getProject();
    // eslint-disable-next-line
  }, [projectId])

  const handleDeleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/projects')
      toast.success('Project data deleted!')
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && project && <div>
        <div>
          <h3>{project.foundation.name}</h3>
          <img src={project.foundation.logo} alt={project.foundation.acronym}/>
        </div>
        <div>
          <h3>{project.animal.common_name}</h3>
          <img src={project.animal.image} alt={project.common_name}/>
        </div>
        <h3>Collected donations:</h3>
        <h3>{project.collected_donations}</h3>
      </div>}

      {error && <p>Something went wrong. Couldn't find your project</p>}

      <div>
        {isLoggedIn && user.role === 'admin' && <button onClick={()=>handleDeleteProject(projectId)}>Delete</button>}
      </div>
    </div>
  )
}
