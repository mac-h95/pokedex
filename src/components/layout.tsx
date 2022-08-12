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
        <img src="/logo.svg" alt="Pokéball logo" />
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
