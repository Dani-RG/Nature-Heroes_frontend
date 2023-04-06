import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>{user.username}</h2>
      <img src={user.image} alt={user.username} />
      <h4>{user.email}</h4>
      <h4>{user.role}</h4>
    </div>
  )
}
