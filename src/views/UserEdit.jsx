import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import userService from '../services/userService';
import toast from 'react-hot-toast';

export default function UserEdit() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const userId = user._id
  const [userEdit, setUserEdit] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await authService.me(userId);
      setUserEdit(response);
      setError(false);
    } catch (error) {
      console.error(error)
      setError(true);
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [user._id])

  const handleChange = (e) => {
    setUserEdit(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleEdit = async () => {
    try {
      await userService.editUser(userId, userEdit);
      navigate('/me')
      toast.success('User edited!')
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit();
  }

  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/')
      toast.success('User deleted!')
    }
  }

  return (
    <div>
      <h2>Edit user:</h2>
      <img src={userEdit.image} width={'300px'} alt={userEdit.username} />

      <form onSubmit={handleSubmit}>

        <label>Username:</label>
        <input type='text' name='username' value={userEdit.username} onChange={handleChange} required />

        <label>Image:</label>
        <input type='text' name='image' value={userEdit.image} onChange={handleChange} required />

        <button type='submit'>Save profile</button>
      </form>

      {isLoggedIn && <button onClick={()=>handleDeleteUser(userEdit._id)}>Delete user</button>}

      {error && <p>Something went wrong.</p>}
    </div>
  )
}
