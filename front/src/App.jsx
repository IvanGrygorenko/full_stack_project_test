

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperheroList from './components/SuperheroList';
import SuperheroForm from './components/SuperheroForm';
import SuperheroDetails from './components/SuperheroDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuperheroList />} />
        <Route path="/create" element={<SuperheroForm />} />
        <Route path="/edit/:id" element={<SuperheroForm />} />
        <Route path="/details/:id" element={<SuperheroDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

