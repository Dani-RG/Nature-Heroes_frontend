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
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {/* {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>} */}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
      </ul>
      {user && <p>{user.username}</p> }
    </>
  )
}
