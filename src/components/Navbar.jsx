import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      {useLocation().pathname !== "/" && <div>

        <div className='header_nav lighter_solid_bg'>
          <Link to='/animals'>
            <img className='nav_logo' src={'../images/NH_logo_horiz.png'} alt='Nature Heroes'/>
          </Link>
        

          <div className='navbar'>
            <Link to='#' className='menu_bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <nav className={sidebar ? 'nav_menu active' : 'nav_menu'}>
              <ul className='nav_menu_items' onClick={showSidebar}>

                <li className='navbar_toggle'>
                  <Link to='#' className='menu_bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>

                {/* USER AND ADMIN */}
                {!isLoggedIn && <li className='nav_text'><NavLink to='/signup'>Sign up</NavLink></li>}
                {!isLoggedIn && <li className='nav_text'><NavLink to='/login'>Login</NavLink></li>}
                {isLoggedIn && <li className='nav_text'><NavLink to={'/me'}>Profile</NavLink></li>}
                {isLoggedIn && <li className='nav_text'><button onClick={() => logOutUser()}>Log out</button></li>}
                {isLoggedIn && <li className='nav_text'><NavLink to='/animals'>Animals</NavLink></li>}
                {isLoggedIn && <li className='nav_text'><NavLink to='/foundations'>Foundts.</NavLink></li>}

                {/* ADMIN */}
                {isLoggedIn && user.role === 'admin' && <li className='nav_text'><NavLink to='/create'>Create</NavLink></li>}

              </ul>
            </nav>
          </div>

        </div>

      </div>}
    </div>
  )
}
