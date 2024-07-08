import React from 'react';
import Grid from './Grid';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Rain Drop Game</h1>
      </header>
      <main className="app-main">
        <Grid rows={15} columns={20} /> {/* Example size, can be adjusted */}
      </main>
    </div>
  );
}

export default App;
