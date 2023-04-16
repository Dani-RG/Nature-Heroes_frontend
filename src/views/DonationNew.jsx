import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import donationService from '../services/donationService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function DonationNew() {
  const { projectId } = useParams();
  const project = projectId;
  const { user, storeToken, removeToken, authenticateUser } = useContext(AuthContext);
  const userId = user._id;
  const initialState = { amount: 0 };
  const [newDonation, setNewDonation] = useState(initialState);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewDonation(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        project, userId
      }
    })
  }

  const handleCreate = async () => {
    try {
      // eslint-disable-next-line
      const createdDonation = await donationService.createDonation(newDonation, projectId);
      
      removeToken()
      storeToken(createdDonation.authToken)
      authenticateUser()

      setNewDonation(initialState);
      setError(false)
      navigate(`/projects/${projectId}`)
      toast.success('Donation sent!')
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='hidden' name='project' value={project} required />
        <input type='hidden' name='user' value={userId} required />

        <div className='donation_box'>
          <label className='bolder_text'>Amount:</label>
          <input type='number' name='amount' min='10' max='100' step='10' value={newDonation.amount} onChange={handleChange} required />
          <button type='submit' className='bolder_text'> Send </button>
        </div>

      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
