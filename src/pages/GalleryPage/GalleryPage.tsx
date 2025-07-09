import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const images = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/id/${i}/200/300`,
}));

const PAGE_SIZE = 10;

const GalleryPage = () => {
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber || '1');

  const offset = (currentPage - 1) * PAGE_SIZE;
  const paginatedImages = images.slice(offset, offset + PAGE_SIZE);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {paginatedImages.map((image) => (
        <div key={image.id} style={{ margin: '10px' }}>
          <img src={image.url} alt={`Image ${image.id}`} width="200" height="300" />
        </div>
      ))}
      
      <nav style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to={`/gallery/${currentPage > 1 ? currentPage - 1 : 1}`}>Назад</Link>  
        <Link to={`/gallery/${Math.min(currentPage + 1, Math.ceil(images.length / PAGE_SIZE))}`}>Вперед</Link>
      </nav>
    </div>
  );
};

export default GalleryPage;