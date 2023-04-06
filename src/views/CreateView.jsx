import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateView() {
  return (
    <div>
      <h3>CREATE AREA:</h3>
      <button><Link to={'/animals/new'}>Register Animal</Link></button>
      <button><Link to={'/foundations/new'}>Add a Foundation</Link></button>
      <button><Link to={'/projects/new'}>Create new Project</Link></button>
    </div>
  )
}
