import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import projectService from '../services/projectService'

export default function New({ handleAddShow }) {
  const initialState = {
    title: '',
    creator: '',
    launched: '',
    genre: '',
    image: '',
    description: '',
  }
  const [newShow, setNewShow] = useState(initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setNewShow(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdShow = await showService.createShow(newShow);
      setNewShow(initialState);
      setError(false)
      navigate(`/shows/${createdShow._id}`)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  };

  return (
    <div>
      <h2>Create a tv show</h2>
        <form onSubmit={handleSubmit}>
          <label> Title </label>
          <input type='text' name='title' value={newShow.title} onChange={handleChange} required/>
          
          <label> Creator </label>
          <input type='text' name='creator' value={newShow.creator} onChange={handleChange} />
          
          <label> Launched </label>
          <input type='number' name='launched' value={newShow.launched} onChange={handleChange} />
          
          <label> Genre </label>
          <input type='text' name='genre' value={newShow.genre} onChange={handleChange} />
          
          <label> Image </label>
          <input type='text' name='image' value={newShow.image} onChange={handleChange} />
          
          <label> Description </label>
          <input type='text' name='description' value={newShow.description} onChange={handleChange} />
          
          <button type='submit'>Submit</button>
        </form>
        {error && <p>Sorry, something went wrong.</p>}
    </div>
  )
}