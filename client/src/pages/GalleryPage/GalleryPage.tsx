import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './GalleryPage.module.css';
import Pagination from '@mui/material/Pagination';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { fetchDogs, likeImage, unlikeImage } from '../../api/DogApi';

const images = Array.from({ length: 100 }, (_, i) => ({
  fileName: `image${i + 1}.jpg`,
  id: i + 1,
  likes: 0,
  url: `https://picsum.photos/id/${i}/200/300`,
}));

const PAGE_SIZE = 10;

const GalleryPage = () => {
  const pathname = window.location.pathname;
  const [homeIsActive, setHomeIsActive] = useState(false);
  const [favoritesIsActive, setFavoritesIsActive] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [likedCards, setLikedCards] = useState(new Set());
  const [dogsImages, setDogsImages] = useState(images);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber || '1');

  const handleLike = (id: number) => {
    const isAlreadyLiked = likedCards.has(id);

    if (isAlreadyLiked) {
      unlikeImage(id);
    } else {
      likeImage(id);
    }

    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));

    const updatedLikedCards = new Set(likedCards);
    if (isAlreadyLiked) {
      updatedLikedCards.delete(id);
    } else {
      updatedLikedCards.add(id);
    }
    setLikedCards(updatedLikedCards);

    saveToLocalStorage(Array.from(updatedLikedCards) as number[]);
  };

  useEffect(() => {
    const storedLikedCards = JSON.parse(localStorage.getItem('likedCards') ?? '[]');
    setLikedCards(new Set(storedLikedCards));

    const initialLikes: Record<number, boolean> = {};
    for (let id of storedLikedCards) {
      initialLikes[id] = true;
    }
    setLikes(initialLikes);
  }, []);

  const saveToLocalStorage = (ids: number[]) => {
    localStorage.setItem('likedCards', JSON.stringify(ids));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/gallery/${value}`);
  };

  useEffect(() => {
        setHomeIsActive(pathname === "/");
        setFavoritesIsActive(pathname === "/favorites");
    }, [pathname]);

  useEffect(() => {
    fetchDogs(currentPage, PAGE_SIZE)
      .then((data) => {
        setDogsImages(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.buttonGroup}>
            <Link to="/">
              <Button>
                <HomeFilledIcon
                  className={`${styles.sider_button} ${homeIsActive ? styles.sider_button_active : ''}`}
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease-in-out' }}
                />
              </Button>
            </Link>
            <Link to="/favorites">
              <Button>
                <FavoriteIcon
                  className={`${styles.sider_button} ${favoritesIsActive ? styles.sider_button_active : ''}`}
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease-in-out' }}
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            {dogsImages.map((image) => (
              <div key={image.id} className={styles.card}>
                <div className={styles.card_image}>
                  <img src={image.url} alt={image.fileName} />
                </div>
                <div className={styles.cardContent}>
                  <Button onClick={() => handleLike(image.id)}>
                    <FavoriteIcon
                      className={`${styles.card_button} ${likes[image.id] ? styles.card_button_active : ''}`}
                      style={{ width: '30px', height: '30px', transition: 'all 0.3s ease-in-out' }}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination count={10} page={currentPage} onChange={handlePageChange} />
          </nav>
        </div>
      </div>
    </>
    
  );
};

export default GalleryPage;