import React from 'react'

export default function SearchInput(props) {

  const { handleSearchValue } = props;

  const handleChange = (e) => {
    handleSearchValue(e.target.value)
  }

  return (
    <div className='search_bar'>
      <input type="text" name="search" onChange={handleChange} placeholder="Search" />
    </div>
  )
}