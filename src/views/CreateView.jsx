import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateView() {
  return (
    <div className='container_centered'>
      <h3>CREATE AREA:</h3>
      <button className='bigger_text bolder_text create_btn'><Link to={'/animals/new'}>Register Animal</Link></button>
      <button  className='bigger_text bolder_text create_btn'><Link to={'/foundations/new'}>Add a Foundation</Link></button>
      <button  className='bigger_text bolder_text create_btn'><Link to={'/projects/new'}>Create new Project</Link></button>
    </div>
  )
}
