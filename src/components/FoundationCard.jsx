import React from 'react';

export default function FoundationCard({ foundation }) {
  const { name, acronym, logo} = foundation;

  return (
    <div className="foundation_card">
      <img src={logo} width={'400px'} alt={name} />
      <h2>{name}</h2>
      <h2>{acronym}</h2>
    </div>
  )
}
