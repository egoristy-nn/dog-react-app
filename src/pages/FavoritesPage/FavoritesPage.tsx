import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favoriteImages, setFavoriteImages] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteImages(favorites);
  }, []);

  if (!favoriteImages.length) {
    return <h1>Нет любимых изображений</h1>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {favoriteImages.map(id => (
        <div key={id} style={{ margin: '10px' }}>
          <img src={`https://picsum.photos/id/${id}/200/300`} alt={`Image ${id}`} width="200" height="300" />
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;