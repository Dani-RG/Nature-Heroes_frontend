import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

export default function UserDetail() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUser = async () => {
    try {
      const response = await authService.me(user._id);
      setLoading(false);
      setUserId(response._id);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
      setError(true)
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [user._id])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && user && <div>
        <div>
          <img src={user.image} alt={user.username}/>
          <h2>Username:</h2>
          <h2>{user.username}</h2>
          <h2>Email:</h2>
          <h2>{user.email}</h2>
          <h2>Role:</h2>
          <h2>{user.role}</h2>
        </div>
        <div>
          <h3>Donated amout:</h3>
          <h3>{user.donated_total}</h3>
        </div>
      </div>}

      <div>
        {isLoggedIn && <button><Link to={`/users/edit/${userId}`}>Edit</Link></button>}

      {error && <p>Something went wrong. Couldn't find this user</p>}
      </div>
    </div>
  )
}
