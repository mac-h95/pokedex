import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const ContextWrapper = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    const favouritesData = JSON.parse(localStorage.getItem('favourites'));
    const comparisonsData = JSON.parse(localStorage.getItem('comparisons'));
    if (favouritesData) {
      setFavourites(favouritesData);
    }
    if (comparisonsData) {
      setComparisons(comparisonsData);
    }
  }, []);

  const addToFavourites = async (pokemon) => {
    const newFavs = [...favourites, pokemon];
    localStorage.setItem('favourites', JSON.stringify(newFavs));
    setFavourites(newFavs);
  };

  const removeFromFavourites = (id) => {
    const newFavs = favourites.filter((pokemon) => pokemon.id !== id);
    localStorage.setItem('favourites', JSON.stringify(newFavs));
    setFavourites(newFavs);
  };

  const checkIfFavourite = (id) => {
    
  }

  const updateFavourites = (pokemon) => {
    if (favourites.includes(pokemon.id)) removeFromFavourites(pokemon.id);
    else addToFavourites(pokemon);
  };

  const addToComparisons = async (pokemon) => {
    const newComps = [...comparisons, pokemon];
    localStorage.setItem('comparisons', JSON.stringify(newComps));
    setComparisons(newComps);
  };

  const removeFromComparisons = (id) => {
    const newComps = comparisons.filter((pokemon) => pokemon.id !== id);
    localStorage.setItem('comparisons', JSON.stringify(newComps));
    setComparisons(newComps);
  };

  const updateComparisons = (pokemon) => {
    if (comparisons.includes(pokemon.id)) removeFromComparisons(pokemon.id);
    else addToFavourites(pokemon);
  };

  return (
    <ContextWrapper.Provider
      value={{
        favourites,
        comparisons,
        updateFavourites,
        updateComparisons,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};

export const useData = () => useContext(ContextWrapper);
