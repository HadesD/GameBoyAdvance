import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home'

class Main extends Component
{
  render()
  {
    return (
      <main>
        <Route path="/" component={Home} />
      </main>
    );
  }
}

export default Main;

