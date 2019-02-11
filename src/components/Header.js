import React, { Component } from 'react';
import {
  Link, withRouter
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import GbaIcon from './game-boy-advance.svg';

class Header extends Component
{
  render()
  {
    const pathName = this.props.location.pathname;
    return (
      <Layout.Header style={{ height:'inherit',lineHeight:'inherit' }}>
        <Menu
          theme="dark"
          selectedKeys={[pathName]}
          mode="horizontal"
          style={{ lineHeight: pathName === '/play' ? '25px' : '46px' }}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" />Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/play">
            <Link to="/play">
              <i className="anticon" style={{ verticalAlign: 'text-top', width: '22px' }}>
                <img src={GbaIcon} alt="Play" />
              </i>
              Play
            </Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);

