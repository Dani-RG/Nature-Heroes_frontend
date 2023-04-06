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
  //const [project, setProject] = useState({});
  //const [userId, setUserId] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  console.log('project:', project)
  console.log('user:', _id);

  const handleChange = (e) => {
    //setProject(projectId)
    //setUserId(user._id)
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
      navigate('/animals')
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

        <input type='text' name='project' value={project} readOnly required />
        <input type='text' name='user' value={user} readOnly required />

        <label>Amount:</label>
        <input type='number' name='amount' min='1' max='100' step='1' value={newDonation.amount} onChange={handleChange} required />

        <button type='submit'> Send </button>
      </form>
      {error && <p>Something went wrong.</p>}
    </div>
  )
}
