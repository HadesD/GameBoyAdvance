import React, { Component } from 'react';
import {
  Layout
} from 'antd';

import withSplashScreen from './components/withSplashScreen';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Sider from './components/Footer';

//import './App.css';
//import 'antd/dist/antd.css';

class App extends Component
{
  render()
  {
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider />
          <Main />
        </Layout>
        <Footer />
      </Layout>
    );
  }
}

export default withSplashScreen(App);

