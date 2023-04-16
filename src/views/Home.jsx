import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <div className='home_view' >
      <div>
        <Link to={'/animals'}>
          <img src={'../images/NH_logo_color.png'} className='home_logo' alt='Nature Heroes'/>
        </Link>
      </div>
      <div className='home_auth'>
        {!isLoggedIn && <Link to={'/login'}>
          <h4>Log in</h4>
        </Link>}
        {!isLoggedIn && <Link to={'/signup'}>
          <h4>Sign up</h4>
        </Link>}
      </div>
    </div>
  )
}
