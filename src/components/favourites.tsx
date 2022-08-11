import * as React from 'react';
import { useData } from '../library/context';
import { Item } from './pokemon';

export default function Favourites() {
  const { favourites } = useData();
  console.log(favourites);
  return (
    <div className="container">
      <h1>Favourites</h1>

      {favourites.length < 1 && (
        <p>
          Currently you have no favourites selected. Click on the start on a
          Pokémon's card to favourite it.
        </p>
      )}
      {favourites.length > 1 && (
        <div className="list">
          {favourites.map((id) => (
            <Item id={id} />
          ))}
        </div>
      )}
    </div>
  );
}
