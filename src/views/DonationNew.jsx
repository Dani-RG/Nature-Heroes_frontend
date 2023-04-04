import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import donationService from '../services/donationService'

export default function DonationNew() {
  const userId = undefined
  const { projectId } = useParams();
  const initialState = { amount: 1 }
  const [newDonation, setNewDonation] = useState(initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setNewDonation(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCreate = async () => {
    try {
      const donationData = {
        amount: newDonation.amount,
        project: newDonation.project,
        user: newDonation.user
      }
      const createdDonation = await donationService.createDonation(newDonation);
      setNewDonation(initialState);
      setError(false)
      navigate('/')
      // navigate(`/donations/${createdDonation._id}`)
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

        <input type='text' name='project' value={projectId} readOnly required />
        <input type='text' name='user' value={userId} readOnly required />

        <label> Amount: </label>
        <input type='number' name='amount' min="1" max="100" step="1" value={newDonation.amount} onChange={handleChange} required />

        <button type='submit'> Send </button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
