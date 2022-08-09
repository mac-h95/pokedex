import * as React from 'react';
import './style.css';
import { useState } from 'react';
import useSWR from 'swr';
import { Star, BarChart } from 'react-feather';

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
  if (!localStorage.getItem('favourites'))
    localStorage.setItem('favourites', []);

  return (
    <div id="app-container">
      <Header />
      <Container />
      <Spacer />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <a href="/">
        <Pokeball />
        <h1>Pokémon</h1>
      </a>
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
                xp={pokemon.xp}
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

function Overview({ id, sprite, name, flipped, setFlipped }) {
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

function Footer() {
  return (
    <footer>
      <span>
        © <a href="/">Pokemon</a>, {new Date().getFullYear()}
      </span>
    </footer>
  );
}
