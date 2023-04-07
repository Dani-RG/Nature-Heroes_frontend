import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <ul className='navbar'>

        <li><NavLink to='/animals'>
          <img className='nav_logo' src={'../images/NH_logo_W_H.png'} alt='Nature Heroes'/>
        </NavLink></li>

        {/* USER AND ADMIN */}
        {!isLoggedIn && <li><NavLink to='/signup'>Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to='/login'>Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to={'/me'}>Profile</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        {isLoggedIn && <li><NavLink to='/animals'>All animals</NavLink></li>}
        {isLoggedIn && <li><NavLink to='/foundations'>All foundations</NavLink></li>}

        {/* ADMIN */}
        {isLoggedIn && user.role === 'admin' && <li><NavLink to='/create'>Create</NavLink></li>}

      </ul>
      {user && <p>{user.username}</p> }
    </div>
  )
}
