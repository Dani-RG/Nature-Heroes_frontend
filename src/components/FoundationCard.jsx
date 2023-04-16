import React from 'react';

export default function FoundationCard({ foundation }) {
  const { name, logo} = foundation;

  return (
    <div className="foundation_card">
      <div>
        <img src={logo} className='foundation_image' alt={name} />
      </div>
      <div className='details_text'>
        <p>{name}</p>
      </div>
    </div>
  )
}
