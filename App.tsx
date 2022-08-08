import * as React from 'react';
import './style.css';
import logo from './static/logo.png';

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
        <img src={logo} alt="Pokemon Logo" />
      </a>
    </header>
  );
}

function Container() {}

function Menu() {}

function List() {}

function Item() {}

function Footer() {}
