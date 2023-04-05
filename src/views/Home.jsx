import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext); 

  return (
    <div className="Home">
      {user && <p>Hello {user.username}!</p> }
      <Link to={'/animals'}>
        <img src={'../images/NH_logo.jpg'} alt='Nature Heroes'/>
      </Link>
      {!isLoggedIn && <Link to={'/login'}>
        <h4>Log in</h4>
      </Link>}
      {!isLoggedIn && <Link to={'/signup'}>
        <h4>Sign up</h4>
      </Link>}
    </div>
  )
}
