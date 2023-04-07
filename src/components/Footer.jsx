import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div>
        <Link to='/developers'>About Us</Link>
        <div onClick={(e) => {window.location.href ='mailto:daniel.deweb@gmail.com';}}>Contact</div>
      </div>
      <div>
        <p>Copyright 2023</p>
      </div>
    </div>
  )
}
