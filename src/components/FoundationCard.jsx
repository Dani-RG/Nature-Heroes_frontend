import React from 'react';

export default function FoundationCard({ foundation }) {
  const { name, acronym, logo} = foundation;

  return (
    <div className="foundation_card">
      <div>
        <img src={logo} className='foundation_image' alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <h2>{acronym}</h2>
      </div>
    </div>
  )
}
