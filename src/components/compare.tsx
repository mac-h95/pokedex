import * as React from 'react';
import { useData } from '../library/context';
import { Item } from './pokemon';
import { Chart } from 'react-google-charts';
import { fetchPokemonById } from '../library/data';

export default function Favourites() {
  const { comparisons } = useData();
  console.log(comparisons);
  return (
    <div className="container">
      <h1>Comparisons</h1>
      {comparisons.length < 1 && (
        <p>
          Currently you have no comparisons selected. Click on the start on a
          Pokemons card to add it to the comparison, you can select up to 3.
        </p>
      )}
      {comparisons.length > 1 && (
        <div className="container">
          <div className="list">
            {comparisons.map((id) => (
              <Item id={id} />
            ))}
          </div>
          <BarChart data={comparisons} />
        </div>
      )}
    </div>
  );
}

function formatData(data) {
  let pokemonData = [['Name', 'Base Experience', 'Height', 'Weight']];

  data.forEach((mon) => {
    const { name, base_experience, height, weight } =
      fetchPokemonById(mon).pokemon;
    pokemonData.push([name, base_experience, height, weight]);
  });

  return pokemonData;
}

function BarChart({ data }) {
  const pokemonData = formatData(data);

  return (
    <div className="container">
      <h1>Chart</h1>
      <div>
        <Chart
          chartType="BarChart"
          width="80vw"
          height="600px"
          data={pokemonData}
          options={{
            title: 'Pokémon Stats Comparison',
            hAxis: {
              title: 'Amount',
            },
            vAxis: {
              title: 'Pokémon',
            },
          }}
        />
      </div>
    </div>
  );
}
