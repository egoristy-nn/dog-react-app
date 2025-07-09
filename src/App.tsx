import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/gallery/:pageNumber" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
