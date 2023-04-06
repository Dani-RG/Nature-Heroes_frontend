import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>{user.username}</h2>
    </div>
  )
}
