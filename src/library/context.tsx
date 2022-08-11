import { createContext, useContext, useEffect, useState } from 'react';
import * as React from 'react';

export const AppContext = createContext();

export default function ContextWrapper({ children }) {
  const [favourites, setFavourites] = useState([]);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    const favouritesData = JSON.parse(localStorage.getItem('favourites'));
    const comparisonsData = JSON.parse(localStorage.getItem('comparisons'));

    if (favouritesData) {
      setFavourites(favouritesData);
    } else {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    if (comparisonsData) {
      setComparisons(comparisonsData);
    } else {
      localStorage.setItem('comparisons', JSON.stringify(comparisons));
    }
  }, []);

  const addToFavourites = async (id) => {
    const newFavs = [...favourites, id];
    localStorage.setItem('favourites', JSON.stringify(newFavs));
    setFavourites(newFavs);
  };

  const removeFromFavourites = (id) => {
    const newFavs = favourites.filter((pokemon) => pokemon !== id);
    localStorage.setItem('favourites', JSON.stringify(newFavs));
    setFavourites(newFavs);
  };

  const checkIfFavourite = (id) => {
    const favs = JSON.parse(localStorage.getItem('favourites'));

    if (favs.includes(id)) return true;
    else return false;
  };

  const updateFavourites = (id) => {
    console.log(favourites.includes(id));
    if (favourites.includes(id)) removeFromFavourites(id);
    else addToFavourites(id);
    console.log(favourites);
  };

  return (
    <AppContext.Provider
      value={{
        favourites,
        comparisons,
        checkIfFavourite,
        updateFavourites,
        // updateComparisons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useData = () => useContext(AppContext);
