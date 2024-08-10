import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import {BrowserRouter as Router,Routes,Route,NavLink} from 'react-router-dom';
import Profile from './components/profile';
import Prices from './components/prices';
import Landing from './components/landing';
import Home from './components/home';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import config from './aws-exports';
import '@radix-ui/themes/styles.css';
import cors from 'axios';

Amplify.configure(config);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing /> }></Route>
          <Route path="/home" element={ <Home /> }></Route>
          <Route path="/profile" element={ <Profile /> }></Route>
          <Route path="/prices" element={ <Prices /> }></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
