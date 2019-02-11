import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  Layout
} from 'antd';

import Home from './Home';
import Play from './Play';

class Main extends Component
{
  render()
  {
    return (
      <Layout.Content>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Play} />
      </Layout.Content>
    );
  }
}

export default Main;

