import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AnimalCardDetail from '../components/AnimalCardDetail';
import animalService from '../services/animalService';

export default function AnimalDetail() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getAnimal = async () => {
    try {
      const response = await animalService.getAnimal(animalId);
      setLoading(false);
      setAnimal(response);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getAnimal();
    // eslint-disable-next-line
  }, [animalId])

  // HACER LIFT STATE UP DEL ANIMAL ID, HACIA EL APP.JS

  const handleDeleteAnimal = async (animalId) => {
    try {
      await animalService.deleteAnimal(animalId);
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/')
    }
  }

  console.log(animalId);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && animal && <AnimalCardDetail animal={animal} />}
      {error && <p>Something went wrong. Couldn't find your animal</p>}
      <div>
        <button><Link to={`/animals/edit/${animalId}`}>Edit</Link></button>
        <button onClick={()=>handleDeleteAnimal(animalId)}>Delete</button>
        {/* <button onClick={()=>handleDeleteAnimal(`${animalId}`)}>Delete</button> */}
      </div>
    </div>
  )
}
