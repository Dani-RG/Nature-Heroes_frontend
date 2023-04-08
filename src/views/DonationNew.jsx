import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import donationService from '../services/donationService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function DonationNew() {
  const { projectId } = useParams();
  const project = projectId;
  let { user } = useContext(AuthContext);
  const { _id } = user;
  user = _id;
  const initialState = { amount: 0 };
  const [newDonation, setNewDonation] = useState(initialState);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewDonation(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        project, user
      }
    })
  }

  const handleCreate = async () => {
    try {
      // eslint-disable-next-line
      const createdDonation = await donationService.createDonation(newDonation, projectId);
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
        <input type='hidden' name='user' value={user} required />

        <label>Amount:</label>
        <input type='number' name='amount' min='10' max='100' step='10' value={newDonation.amount} onChange={handleChange} required />

        <button type='submit'> Send </button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
