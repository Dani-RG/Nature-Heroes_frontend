import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  return (
    <>
      <ul className='navbar'>

        <li><NavLink to="/animals">
          <img className='nav_logo' src={'../images/NH_logo_W_H.png'} alt='Nature Heroes'/>
        </NavLink></li>

        {/* USER AND ADMIN */}
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/user/:userId">Profile</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/projects/donations/:userId">My Donations</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}

        {/* ADMIN */}
        {isLoggedIn && user.role === 'admin' && <li><NavLink to="/foundations">All foundations</NavLink></li>}
        {/* {isLoggedIn && user.role === 'admin' && <li><NavLink to="/projects">All projects</NavLink></li>} */}
        {isLoggedIn && user.role === 'admin' && <li><NavLink to="/create">Create</NavLink></li>}

      </ul>
      {user && <p>{user.username}</p> }
    </>
  )
}
