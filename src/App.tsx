import * as React from 'react';
import './style.css';
import { useState } from 'react';
import Layout from './components/layout';

export default function App() {
  const [view, setView] = useState('list');

  return <Layout view={view} setView={setView} />;
}
