import * as React from 'react';
import Pokemon from './pokemon';
import Compare from './compare';
import Favourites from './favourites';
import ContextWrapper from '../library/context';

export default function Layout({ view, setView }) {
  return (
    <div id="app-container">
      <ContextWrapper>
        <Header view={view} setView={setView} />
        <Container view={view} />
        <Spacer />
        <Footer />
      </ContextWrapper>
    </div>
  );
}

function Header({ view, setView }) {
  return (
    <header>
      <a href="/">
        <Pokeball />
        <h1>Pokédex</h1>
      </a>
      <nav>
        <a
          onClick={() => setView('list')}
          className={view === 'list' && 'active'}
        >
          All Pokémon
        </a>
        <a
          onClick={() => setView('compare')}
          className={view === 'compare' && 'active'}
        >
          Compare
        </a>
        <a
          onClick={() => setView('favourites')}
          className={view === 'favourites' && 'active'}
        >
          Favourites
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

function Container({ view }) {
  switch (view) {
    case 'list':
      return <Pokemon />;
    case 'compare':
      return <Compare />;
    case 'favourites':
      return <Favourites />;
  }
}

function Spacer() {
  return <div className="spacer" />;
}

function Footer() {
  return (
    <footer>
      <span>
        © <a href="/">Pokémon</a>, {new Date().getFullYear()}
      </span>
    </footer>
  );
}
