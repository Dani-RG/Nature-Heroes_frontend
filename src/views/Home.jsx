import React, { useState, useEffect } from 'react';
import AnimalCardResume from '../components/AnimalCardResume';
import animalService from '../services/animalService';

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAnimals = async () => {
    try {
      const response = await animalService.getAnimals();
      setAnimals(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnimals()
  }, [])

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div className="app">
          <div className="card_container">
            {animals.map(elem => {
                return <AnimalCardResume key={elem._id} animal={elem} />
              })} 
          </div>
        </div>)}
    </>
  )
}
