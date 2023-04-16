import React, { useState, useEffect } from 'react';
import foundationService from '../services/foundationService';
import SearchInput from '../components/SearchInput';
import FoundationCard from '../components/FoundationCard';

export default function Foundation() {
  const [foundations, setFoundations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getFoundations = async () => {
    try {
      const response = await foundationService.getFoundations();
      setFoundations(response);
      setLoading(false)
      setError(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getFoundations()
    // eslint-disable-next-line
  }, [])

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  return (
    <div className='solid_purple'>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div>
          <div className="search_container">
              <SearchInput handleSearchValue={handleSearch} />
          </div>
          <div className="container_wrap">
            {foundations.filter(elem => elem.name.toLowerCase().includes(searchValue.toLowerCase()) || elem.acronym.toLowerCase().includes(searchValue.toLowerCase()))
              .map(elem => {
                return <FoundationCard key={elem._id} foundation={elem} />
              })} 
          </div>
          {error && <p>Something went wrong.</p>}
        </div>)}
    </div>
  )
}
