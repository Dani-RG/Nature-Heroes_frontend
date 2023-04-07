import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import userService from '../services/userService';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await authService.me(user._id);
      setLoading(false);
      setUserId(response._id);
      setError(false);
      console.log(response, response._id)
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [user._id])

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
      {loading && <p>Loading...</p>}
      {!loading && user && <div>
        <div>
          <h3>{user.username}</h3>
          <img src={user.image} alt={user.username}/>
          <h4>{user.email}</h4>
          <h4>{user.role}</h4>
        </div>
        <div>
          <h3>User donations:</h3>
          {/* <h3>{user.total_donations}</h3> */}
        </div>
      </div>}

      {error && <p>Something went wrong.</p>}

      <div>
        {isLoggedIn && <button><Link to={`/users/edit/${userId}`}>Edit</Link></button>}
        {isLoggedIn && <button onClick={()=>handleDeleteUser(user._id)}>Delete</button>}
      </div>
    </div>
  )
}
