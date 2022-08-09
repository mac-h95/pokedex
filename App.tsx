import * as React from 'react';
import './style.css';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function fetchPokemon() {
  const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function App() {
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
        <h1>Pokémon</h1>
      </a>
    </header>
  );
}

function Container() {
  const { data, isLoading, isError } = fetchPokemon();

  return (
    <main>
      {isLoading && <Loader />}
      {isError && (
        <div id="error">
          <h1>Oops something went wrong...</h1>
          <p>Contact support if this error persists.</p>
        </div>
      )}
      {data && (
        <div className="container">
          <Menu />
          <List />
        </div>
      )}
    </main>
  );
}

function Menu() {
  const [currentGen, setCurrentGen] = useState('All');
  const generations = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  return (
    <div id="menu">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search by name..."
      />
      <div className="dropdown">
        <button className="dropbtn">{currentGen}</button>
        <div className="dropdown-content">
          {generations.map((gen) => (
            <span key={gen} onClick={() => setCurrentGen(gen)}>
              {gen}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return <div className="loader" />;
}

function List() {
  const pokemon = { id: 1, name: 'test' };
  return (
    <div id="list">
      <Item pokemon={pokemon} />
    </div>
  );
}

function Item({ pokemon }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="item" onClick={() => setFlipped(!flipped)}>
      <span className="corner-ribbon">{pokemon.id}</span>
      {flipped ? <Details {...pokemon} /> : <Overview {...pokemon} />}
    </div>
  );
}

function Overview({ id, sprite, name, height, weight }) {
  return (
    <div className="details">
      <img src={sprite} alt={`${name}'s sprite`} />
      <h2>{name}</h2>
    </div>
  );
}

function Details({ name, xp, height, weight, type, generation }) {
  return (
    <div className="details">
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
        <b>Types:</b> {type}
      </span>
      <span>
        <b>Generation:</b> {generation}
      </span>
    </div>
  );
}
function Spacer() {
  return <div className="spacer" />;
}

function Footer() {
  return (
    <footer>
      <span>© Pokemon, {new Date().getFullYear()}</span>
    </footer>
  );
}
