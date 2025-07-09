import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './GalleryPage.module.css';
import Pagination from '@mui/material/Pagination';

const images = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/id/${i}/200/300`,
}));

const PAGE_SIZE = 10;

const GalleryPage = () => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber || '1');

  const offset = (currentPage - 1) * PAGE_SIZE;
  const paginatedImages = images.slice(offset, offset + PAGE_SIZE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/gallery/${value}`);
  };

  return (
    <>
    <div className={styles.container}>
      {paginatedImages.map((image) => (
        <div key={image.id} className={styles.card}>
          <img src={image.url} alt={`Image ${image.id}`} width="200" height="300" />
        </div>
      ))}
    </div>
    <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        {/* <Link to={`/gallery/${currentPage > 1 ? currentPage - 1 : 1}`}>Назад</Link>  
        <Link to={`/gallery/${Math.min(currentPage + 1, Math.ceil(images.length / PAGE_SIZE))}`}>Вперед</Link> */}
        <Pagination count={10} page={currentPage} onChange={handlePageChange}/>
    </nav>
    </>
    
  );
};

export default GalleryPage;