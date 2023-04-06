import './App.css';
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
import AnimalNew from './views/AnimalNew';
import AnimalDetail from './views/AnimalDetail';
import AnimalEdit from './views/AnimalEdit';
import FoundationNew from './views/FoundationNew';
import Projects from './views/ProjectSelection';
import ProjectSelection from './views/ProjectSelection';
import ProjectNew from './views/ProjectNew';
import DonationNew from './views/DonationNew';
import React, { useState } from 'react';

function App() {
  const [animalId, setAnimal] = useState({});

  const handleAnimal = (animalId) => {
    setAnimal(animalId) 
  }

  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<IsPrivate><CreateView /></IsPrivate>} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/animals/new" element={<AnimalNew />} />
        <Route path="/animals/:animalId" element={<AnimalDetail handleAnimal={handleAnimal} />} />
        <Route path="/animals/edit/:animalId" element={<AnimalEdit />} />
        <Route path="/foundations/new" element={<FoundationNew />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/projects/selection" element={<ProjectSelection animalId={animalId} />}>
          <Route path="/projects/selection/donations/:projectId" element={<DonationNew />} />
        </Route>

        <Route path="/projects/new" element={<ProjectNew />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
