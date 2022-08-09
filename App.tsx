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
  console.log(data);
  return (
    <main>
      <Loader />
      {/* {isError && (
        <div id="error">
          <h1>Oops...</h1>
          <p>Contact support if this error persists.</p>
        </div>
      )}
      {data && (
        <div className="container">
          <Menu />
          <List />
        </div>
      )} */}
    </main>
  );
}

function Menu() {
  const [currentGen, setCurrentGen] = useState('All');
  const generations = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  return (
    <div id="menu">
      <input type="text" id="search" name="search" />
      <button>{currentGen}</button>
      <ul id="generation-menu">
        {generations.map((generation) => (
          <li key={generation} onClick={() => setCurrentGen(generation)}>
            {generation}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Loader() {
  return <div className="loader" />;
}

function List() {
  return (
    <div id="list">
      <Item name="test" />
      <Item name="another" />
    </div>
  );
}

function Item({ name }) {
  return (
    <div>
      <h2>{name}</h2>
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
