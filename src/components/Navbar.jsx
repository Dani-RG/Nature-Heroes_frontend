import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li><NavLink to="/animals">
          <img src={'../images/NH_logo.jpg'} width={'50px'} alt='Nature Heroes'/>
        </NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
      {user && <p>{user.username}</p> }
    </div>
  )
}
