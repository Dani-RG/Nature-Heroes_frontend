import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // const navRef = useRef();
  // const openRef = useRef();
  // const closeRef = useRef();

  // const handleOpen = () => {
  //   navRef.current.classList.add('visible');
  // }

  // const handleClose = () => {
  //   navRef.current.classList.remove('visible');
  // }

  return (
    <div>
      {useLocation().pathname !== "/" && <div className='header_nav lighter_solid_bg'>
        <NavLink to='/animals'>
          <img className='nav_logo' src={'../images/color_horiz.png'} alt='Nature Heroes'/>
        </NavLink>
        <button className='open_menu'>MENU</button>
        <div className='nav'>
          <button>CLOSE</button>
          <ul className='nav_list'>
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
        </div>
      </div>}
    </div>
  )
}
