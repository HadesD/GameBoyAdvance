import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Play from './Play';

class Main extends Component
{
  render()
  {
    return (
      <main>
        <Route path="/" component={Home} />
        <Route path="/play" component={Play} />
      </main>
    );
  }
}

export default Main;

