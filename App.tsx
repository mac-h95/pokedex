import * as React from 'react';
import './style.css';
import { useState } from 'react';

export default function App() {
  return (
    <main>
      <Header />
      <Container />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header>
      <a href="/">
        <h1>Pokemon</h1>
      </a>
    </header>
  );
}

function Container() {
  return (
    <div>
      <Menu />
      <List />
    </div>
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
          <li onClick={() => setCurrentGen(generation)}>{generation}</li>
        ))}
      </ul>
    </div>
  );
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

function Footer() {
  return (
    <footer>
      <span>© Pokemon, {new Date().getFullYear()}</span>
    </footer>
  );
}
