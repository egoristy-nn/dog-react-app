import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import styles from '../GalleryPage/GalleryPage.module.css';

const FavoritesPage = () => {
  const [favoriteImages, setFavoriteImages] = useState([]);
  const pathname = window.location.pathname;
  const [homeIsActive, setHomeIsActive] = useState(false);
  const [favoritesIsActive, setFavoritesIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setHomeIsActive(pathname === '/');
    setFavoritesIsActive(pathname === '/favorites');
  }, [pathname]);

  // Получаем лайкнутые карточки из localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('likedCards') || '[]'); // <- Используем "likedCards"
    setFavoriteImages(favorites);
  }, []);

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favoriteImages.filter((favId) => favId !== id); // Фильтруем все кроме текущего id
    setFavoriteImages(updatedFavorites); // Обновляем состояние

    // Сохраняем новое состояние в localStorage
    localStorage.setItem('likedCards', JSON.stringify(updatedFavorites));
  };

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
            {favoriteImages.map((id) => (
              <div key={id} className={styles.card}>
                <div className={styles.card_image}>
                  <img src={id} />
                </div>
                <div className={styles.cardContent}>
                  <Button onClick={() => removeFromFavorites(id)} >
                    <FavoriteIcon
                      className={styles.card_button_active}
                      style={{ width: '30px', height: '30px', transition: 'all 0.3s ease-in-out' }}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;