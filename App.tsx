import * as React from 'react';
import './style.css';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Star, BarChart } from 'react-feather';
import { Chart } from 'react-charts';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function fetchPokemonById(id) {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    fetcher
  );

  return {
    pokemon: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function App() {
  const [comparisons, setComparisons] = useState([]);
  const [view, setView] = useState('list');

  if (!localStorage.getItem('favourites'))
    localStorage.setItem('favourites', []);

  return (
    <div id="app-container">
      <Header view={view} setView={setView} />
      {view === 'list' && <Container setComparisons={setComparisons} />}
      {view === 'compare' && (
        <Compare comparisons={comparisons} setComparisons={setComparisons} />
      )}
      <Spacer />
      <Footer />
    </div>
  );
}

function Header({ view, setView }) {
  return (
    <header>
      <a href="/">
        <Pokeball />
        <h1>Pokémon</h1>
      </a>
      <nav>
        <a
          onClick={() => setView('list')}
          className={view === 'list' && 'active'}
        >
          All Pokemon
        </a>
        <a
          onClick={() => setView('compare')}
          className={view === 'compare' && 'active'}
        >
          Compare
        </a>
      </nav>
    </header>
  );
}

function Pokeball() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px">
      <path
        d="M 30 50
		a 1 1 1 0 1 40 0
		h-12.5
		a 1 1 1 0 0 -15 0
		z"
        fill="#f00"
        stroke="#222"
      ></path>
      <circle cx="50" cy="50" r="5" fill="#222" stroke="#222"></circle>
      <path
        d="M 30 50
		a 1 1 1 0 0 40 0
		h-12.5
		a 1 1 1 0 1 -15 0
		z"
        fill="#fff"
        stroke="#222"
      ></path>
    </svg>
  );
}

function Container() {
  const [id, setId] = useState({ startId: 1, endId: 151 });
  const pokeId = () => {
    let pokemon = [];
    for (let i = id.startId; i <= id.endId; i++) {
      pokemon.push(<Item id={i} />);
    }
    return pokemon;
  };

  function changeGeneration(start, end) {
    setId({ startId: start, endId: end });
  }

  return (
    <main>
      <div className="container">
        <Menu changeGeneration={changeGeneration} />
        <List pokemon={pokeId()} />
      </div>
    </main>
  );
}

function Menu({ changeGeneration }) {
  return (
    <div className="menu">
      <h2>Generation</h2>
      <div className="generations">
        <button onClick={() => changeGeneration(1, 151)}>I</button>
        <button onClick={() => changeGeneration(152, 251)}>II</button>
        <button onClick={() => changeGeneration(252, 386)}>III</button>
        <button onClick={() => changeGeneration(387, 493)}>IV</button>
        <button onClick={() => changeGeneration(494, 649)}>V</button>
      </div>
    </div>
  );
}

function List({ pokemon }) {
  return <div className="list">{pokemon}</div>;
}

function Item({ id }) {
  const { pokemon, isError, isLoading } = fetchPokemonById(id);
  const [flipped, setFlipped] = useState(false);
  if (pokemon) {
    const formattedName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return (
      <div className="item">
        {id && (
          <div>
            {flipped ? (
              <Details
                name={formattedName}
                xp={pokemon.base_experience}
                height={pokemon.height}
                weight={pokemon.weight}
                types={pokemon.types}
                generation={pokemon.generation}
                setFlipped={setFlipped}
              />
            ) : (
              <Overview
                id={id}
                sprite={pokemon.sprites.front_default}
                name={formattedName}
                setFlipped={setFlipped}
              />
            )}
          </div>
        )}
      </div>
    );
  } else if (isLoading) {
    return <div className="item skeleton" />;
  } else if (isError) {
    return (
      <div className="error">
        <h2>Uh oh, something went wrong.</h2>
        <p>If the problem persists contact support.</p>
      </div>
    );
  }
}

function checkIfFavourite(id) {
  return localStorage.getItem('favourites').includes(id);
}

function addToFavourites(id) {
  let newArr = [];

  const oldArr = localStorage.getItem('favourites');

  if (oldArr.includes(id)) {
    newArr.push(oldArr);
    newArr.splice(newArr.indexOf(id));
    localStorage.setItem('favourites', newArr);
  } else {
    newArr.push(id);
    newArr.push(oldArr);
    localStorage.setItem('favourites', newArr);
  }
}

function Overview({ id, sprite, name, flipped, setFlipped, setComparisons }) {
  const [isFavourite, setIsFavourite] = useState(checkIfFavourite(id));

  return (
    <div>
      <span className="corner-ribbon">{id}</span>
      <div className="details" onClick={() => setFlipped(true)}>
        <img src={sprite} alt={`${name}'s sprite`} />
        <h2>{name}</h2>
      </div>
      <div className="actions">
        <span
          onClick={() => (addToFavourites(id), setIsFavourite(!isFavourite))}
        >
          <Star fill={isFavourite ? 'yellow' : 'transparent'} />
        </span>
        <span>
          <BarChart />
        </span>
      </div>
    </div>
  );
}

function Details({ name, xp, height, weight, types, generation, setFlipped }) {
  return (
    <div className="details" onClick={() => setFlipped(false)}>
      <h2>{name}</h2>
      <span>
        <b>Base XP:</b> {xp}
      </span>
      <span>
        <b>Height:</b> {height}
      </span>
      <span>
        <b>Weight:</b> {weight}
      </span>
      <span>
        <b>Types</b>
      </span>
      <div className="type-list">
        {types.map((type) => (
          <span className={`type ${type.type.name}`}>
            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Spacer() {
  return <div className="spacer" />;
}

function Compare({ comparisons }) {
  return (
    <div id="compare-container">
      <div className="container">
        <h1>Compare Pokemon</h1>
        {comparisons < 1 && (
          <p>
            You haven't added any Pokemon yet, click the bar graph on a
            Pokemon's card to add them to the comparison
          </p>
        )}
      </div>
      {comparisons > 1 && <ComparisonChart />}
    </div>
  );
}

function ComparisonChart() {
  const data = [
    {
      label: 'Base Experience',
      data: [
        { name: 'poke1', value: 142 },
        { name: 'poke2', value: 120 },
      ],
    },
    {
      label: 'Height',
      data: [
        { name: 'poke1', value: 8 },
        { name: 'poke2', value: 7 },
      ],
    },
    {
      label: 'Weight',
      data: [
        { name: 'poke1', value: 64 },
        { name: 'poke2', value: 72 },
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.name,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );

  return <Chart options={{ data, primaryAxis, secondaryAxes }} />;
}

function Footer() {
  return (
    <footer>
      <span>
        © <a href="/">Pokemon</a>, {new Date().getFullYear()}
      </span>
    </footer>
  );
}
