import React, { useContext } from 'react';
// import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CircularProgress from '../components/CircularProgress';

export default function UserDetail() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const CircleSize = 200;

  return (
    <div>
      {!user && <p>Loading...</p>}
      {user &&  <div className='container_centered'>
        <div className='details_text'>
          <img src={user.image} className='profile_image' alt={user.username}/>
          <p>Username:</p>
          <p className='bolder_text'>{user.username}</p>
          <p>Email:</p>
          <p className='bolder_text'>{user.email}</p>
          {user.role === 'admin' && <div>
            <p>Role:</p>
            <p className='bolder_text'>{user.role}</p>
          </div>}
        </div>
        <div>
          <h3>Donated amout:</h3>
          <h3 className='bolder_text bigger_text'>{user.donated_total} cr.</h3>
          <CircularProgress progress={user.donated_total%100} size={CircleSize}/>
          <h3>Hero Level:</h3>
          <h3 className='bolder_text bigger_text'>{Math.floor(user.donated_total/100)}</h3>
        </div>
        <div>
          {isLoggedIn && <button className='btn'><Link to={`/users/edit/me`}>Edit</Link></button>}
        </div>
      </div>}
    </div>
  )
}
