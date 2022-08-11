import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';

export const AppContext = createContext({});

export default function ContextWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  const [favourites, setFavourites] = useState<object[] | null>([]);
  const [comparisons, setComparisons] = useState<object[] | null>([]);

  useEffect(() => {
    const favouritesData = JSON.parse(localStorage.getItem('favourites') || '');
    const comparisonsData = JSON.parse(
      sessionStorage.getItem('comparisons') || ''
    );

    if (favouritesData) {
      setFavourites(favouritesData);
    } else {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    if (comparisonsData) {
      setComparisons(comparisonsData);
    } else {
      sessionStorage.setItem('comparisons', JSON.stringify(comparisons));
    }
  }, []);

  const addToStorage = async (id: number, location: string) => {
    if (location === 'favourites') {
      const newFavs = [...[favourites], id];
      localStorage.setItem('favourites', JSON.stringify(newFavs));
      setFavourites(newFavs);
    } else if (location === 'comparisons') {
      if (comparisons.length === 3) throw new Error('Maximum of 3 Comparisons');
      else {
        const newComps = [...comparisons, id];
        sessionStorage.setItem('comparisons', JSON.stringify(newComps));
        setComparisons(newComps);
      }
    }
  };

  const removeFromStorage = (id, location) => {
    if (location === 'favourites') {
      const newFavs = favourites.filter((pokemon) => pokemon !== id);
      localStorage.setItem('favourites', JSON.stringify(newFavs));
      setFavourites(newFavs);
    } else if (location === 'comparisons') {
      const newComps = comparisons.filter((pokemon) => pokemon !== id);
      sessionStorage.setItem('comparisons', JSON.stringify(newComps));
      setComparisons(newComps);
    }
  };

  const updateStorage = (id, location) => {
    if (location === 'favourites') {
      if (favourites.includes(id)) removeFromStorage(id, 'favourites');
      else addToStorage(id, 'favourites');
    } else if (location === 'comparisons') {
      if (comparisons.includes(id)) removeFromStorage(id, 'comparisons');
      else addToStorage(id, 'comparisons');
    }
  };

  return (
    <AppContext.Provider
      value={{
        favourites,
        comparisons,
        updateStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useData = () => useContext(AppContext);
