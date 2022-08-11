import * as React from 'react';
import { useData } from '../library/context';
import { Item } from './pokemon';
import { fetchPokemonById } from '../library/data';

export default function Favourites() {
  const { comparisons } = useData();
  return (
    <div className="container">
      <h1>Comparisons</h1>
      {comparisons.length < 1 && (
        <p>
          Currently you have no favourites selected. Click on the start on a
          Pokemons card to favourite it.
        </p>
      )}
      {comparisons.length > 1 && (
        <div className="container">
          <div className="list">
            {comparisons.map((id) => (
              <Item id={id} />
            ))}
          </div>
          <Chart data={comparisons} />
        </div>
      )}
    </div>
  );
}

function Chart({ data }) {
  let pokemonData = [];
  data.forEach((mon) => {
    const { id, name, base_experience, height, weight } =
      fetchPokemonById(mon).pokemon;
    pokemonData.push({ id, name, base_experience, height, weight });
  });

  console.log(pokemonData);
  return (
    <div className="container">
      <h1>Chart</h1>
    </div>
  );
}
