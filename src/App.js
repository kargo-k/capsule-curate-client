import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <header className="App-header">
        <h1>capsule curate</h1>
      </header>
    </Provider>
  );
}

export default App;