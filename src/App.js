import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import AnimalDetail from './views/AnimalDetail';
import AnimalEdit from './views/AnimalEdit';
import Projects from './views/Projects';
import DonationNew from './views/DonationNew';
import React, { useState } from 'react';

function App() {
  const [animalId, setAnimal] = useState({});

  const handleAnimal = (animalId) => {
    setAnimal(animalId) 
  }

  console.log(animalId)

  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/animals/:animalId" element={<AnimalDetail handleAnimal={handleAnimal} />} />
        <Route path="/animals/edit/:animalId" element={<AnimalEdit />} />
        <Route path="/projects" element={<Projects animalId={animalId} />} />
        <Route path="/donations/:projectId" element={<DonationNew />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
