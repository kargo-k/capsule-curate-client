import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import LandingContainer from './containers/LandingContainer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainContainer from './containers/MainContainer';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={LandingContainer} />
        <Route path='/main' component={MainContainer} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
      </Router>

    </Provider>
  );
}

export default App;