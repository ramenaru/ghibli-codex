import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  const addFavorite = (id: string) => {
    try {
      const newFavorites = [...favorites, id];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorite to localStorage:', error);
    }
  };

  const removeFavorite = (id: string) => {
    try {
      const newFavorites = favorites.filter(fav => fav !== id);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite from localStorage:', error);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite
  };
};
