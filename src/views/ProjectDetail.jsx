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
      setLoading(false)
      setProject(response)
      setError(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setError(true)
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
      navigate('/animals')
      toast.success('Project data deleted!')
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && project && <div className='container_centered'>
        <h2>The foundation:</h2>
        <div className='container_wrap'>
          <img src={project.foundation.logo} className='foundation_image' alt={project.foundation.acronym}/>
          <h3 className='bigger_text'>{project.foundation.name}</h3>
        </div>
        <h2>In a project to support:</h2>
        <div>
          <h3 className='bigger_text'>{project.animal.common_name}</h3>
        </div>
        <div>
          <img src={project.animal.image} className='animal_image' alt={project.common_name}/>
        </div>
        <h2>Has reached</h2>
        <h2 className='bigger_text'>Collected donations:</h2>
        <h3 className='bigger_text bolder_text'> {project.collected_donations} cr.</h3>
        <div>
          {isLoggedIn && user.role === 'admin' && <button onClick={()=>handleDeleteProject(projectId)} className='red_btn'>Delete project</button>}
        </div>
      </div>}
      {error && <p>Something went wrong. Couldn't find this project</p>}
    </div>
  )
}
