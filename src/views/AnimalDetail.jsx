import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AnimalCardDetail from '../components/AnimalCardDetail';
import animalService from '../services/animalService';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export default function AnimalDetail( props ) {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { handleAnimal } = props;
  const { isLoggedIn, user } = useContext(AuthContext);

  const getAnimal = async () => {
    try {
      const response = await animalService.getAnimal(animalId);
      setLoading(false);
      setAnimal(response);
      setError(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
      setError(true)
    }
  }

  useEffect(() => {
    getAnimal();
    // eslint-disable-next-line
  }, [animalId])

  const handleDeleteAnimal = async (animalId) => {
    try {
      await animalService.deleteAnimal(animalId);
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/animals')
      toast.success('Animal data deleted!')
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && animal && <AnimalCardDetail animal={animal} handleAnimal={handleAnimal} />}
      {error && <p>Something went wrong. Couldn't find your animal</p>}
      <div>
        {isLoggedIn && user.role === 'admin' && <button><Link to={`/animals/edit/${animalId}`}>Edit</Link></button>}
        {isLoggedIn && user.role === 'admin' && <button onClick={()=>handleDeleteAnimal(animalId)}>Delete</button>}
      </div>
      {error && <p>Something went wrong. Couldn't find this animal</p>}
    </div>
  )
}
