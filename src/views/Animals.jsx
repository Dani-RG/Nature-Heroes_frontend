import React, { useState, useEffect } from 'react';
import AnimalCardResume from '../components/AnimalCardResume';
import animalService from '../services/animalService';
import SearchInput from '../components/SearchInput';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [animalsCopy, setAnimalsCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getAnimals = async () => {
    try {
      const response = await animalService.getAnimals();
      const shuffledAnimals = handleShuffle(response);
      setLoading(false)
      setAnimals(shuffledAnimals);
      setAnimalsCopy(response)
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    getAnimals()
    // eslint-disable-next-line
  }, [])

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const handleFilter_AR = () => {
    const filteredAnimals = animals;
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_LC = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Least Concern');
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_NT = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Near Threatened');
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_V = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Vulnerable');
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_En = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Endangered');
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_CE = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Critically Endangered');
    setAnimalsCopy(filteredAnimals);
  }
  const handleFilter_ExW = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Extinct in the Wild');
    setAnimalsCopy(filteredAnimals);
  }

  const handleShuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div>
          <div>
              <SearchInput handleSearchValue={handleSearch} />
          </div>
          
          <div className='filters_container'>
            <button onClick={handleFilter_AR}>All Records</button>
            <button onClick={handleFilter_LC}>Least Concern</button>
            <button onClick={handleFilter_NT}>Near Threatened</button>
            <button onClick={handleFilter_V}>Vulnerable</button>
            <button onClick={handleFilter_En}>Endangered</button>
            <button onClick={handleFilter_CE}>Critically Endangered</button>
            <button onClick={handleFilter_ExW}>Extinct in the Wild</button>
          </div>

          <div className='card_container'>
            {animalsCopy.filter(elem => elem.common_name.toLowerCase().includes(searchValue.toLowerCase()) || elem.scientific_name.toLowerCase().includes(searchValue.toLowerCase()) || elem.class_name.toLowerCase().includes(searchValue.toLowerCase()))
              .map(elem => {
                return <AnimalCardResume key={elem._id} animal={elem} />
              })} 
          </div>

          {error && <p>Something went wrong.</p>}
        </div>)}
    </div>
  )
}
