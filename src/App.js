import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import CreateView from './views/CreateView';
import IsPrivate from './components/IsPrivate';
import Animals from './views/Animals';
import AnimalDetail from './views/AnimalDetail';
import AnimalEdit from './views/AnimalEdit';
import AnimalNew from './views/AnimalNew';
import Foundations from './views/Foundations';
import FoundationNew from './views/FoundationNew';
import Projects from './views/Projects';
import ProjectSelection from './views/ProjectSelection';
import ProjectNew from './views/ProjectNew';
import ProjectDetail from './views/ProjectDetail';
import DonationNew from './views/DonationNew';
import UserProfile from './views/UserProfile';

function App() {
  const [animalId, setAnimal] = useState({});

  const handleAnimal = (animalId) => {
    setAnimal(animalId) 
  }

  return (
    <div className='App'>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<IsPrivate><CreateView /></IsPrivate>} />
        <Route path='/animals' element={<Animals />} />
        <Route path='/animals/new' element={<IsPrivate><AnimalNew /></IsPrivate>} />
        <Route path='/animals/:animalId' element={<AnimalDetail handleAnimal={handleAnimal} />} />
        <Route path='/animals/edit/:animalId' element={<IsPrivate><AnimalEdit /></IsPrivate>} />
        <Route path='/foundations' element={<Foundations />} />
        <Route path='/foundations/new' element={<IsPrivate><FoundationNew /></IsPrivate>} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:projectId' element={<ProjectDetail />} />

        <Route path='/projects/selection' element={<ProjectSelection animalId={animalId} />}>
          <Route path='/projects/selection/donations/:projectId' element={<DonationNew />} />
        </Route>

        <Route path='/projects/new' element={<IsPrivate><ProjectNew /></IsPrivate>} />
        <Route path='/users/:userId' element={<UserProfile />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
