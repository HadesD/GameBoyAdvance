import React, { Component } from 'react';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import './App.css';
import 'antd/dist/antd.css';

class App extends Component
{
  render()
  {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;

