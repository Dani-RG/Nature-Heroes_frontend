import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import donationService from '../services/donationService'

export default function DonationNew({ handleAddDonation }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdDonation = await donationService.createDonation(newDonation);
      setNewDonation(initialState);
      setError(false)
      navigate(`/donations/${createdDonation._id}`)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>

        <input type='hidden' name='project' value={projectId} />

        <label> Amount: </label>
        <input type='number' name='amount' min="1" max="100" step="1" value={newDonation.amount} onChange={handleChange}  required />

        <button type='submit'> Send </button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
