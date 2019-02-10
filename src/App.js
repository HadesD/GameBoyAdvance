import React, { Component } from 'react';
import { Layout } from 'antd';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Sider from './components/Footer';

import './App.css';
import 'antd/dist/antd.css';

class App extends Component
{
  render()
  {
    return (
      <Layout>
        <Layout.Header style={{ height:'inherit',lineHeight:'inherit' }}>
          <Header />
        </Layout.Header>
        <Layout>
          <Layout.Sider>
            <Sider />
          </Layout.Sider>
          <Layout.Content>
            <Main />
          </Layout.Content>
        </Layout>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    );
  }
}

export default App;

