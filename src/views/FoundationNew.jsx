import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foundationService from '../services/foundationService';
import toast from 'react-hot-toast';

export default function FoundationNew() {
  const initialState = {
    name: '',
    acronym: '',
    description: '',
    logo: ''
  }
  const [newFoundation, setNewFoundation] = useState(initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setNewFoundation(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCreate = async () => {
    try {
      // eslint-disable-next-line
      const createdFoundation = await foundationService.createFoundation(newFoundation);
      setNewFoundation(initialState);
      setError(false)
      navigate('/foundations')
      toast.success('Foundation registered!')
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
    <div className='card_container'>
      <h2 className='bigger_text bolder_text small_margin'>Register new foundation</h2>
      <form onSubmit={handleSubmit} className='edit_form'>
        <label>Name:</label>
        <input type='text' name='name' value={newFoundation.name} onChange={handleChange} required />

        <label>Acronym:</label>
        <input type='text' name='acronym' value={newFoundation.acronym} onChange={handleChange} required />

        <label>Description:</label>
        <textarea rows='5' cols='33' name='description' value={newFoundation.description} onChange={handleChange} required />

        <label>Logo:</label>
        <input type='text' name='logo' value={newFoundation.logo} onChange={handleChange} required />
          
        <button type='submit' className='green_btn'>Submit</button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
