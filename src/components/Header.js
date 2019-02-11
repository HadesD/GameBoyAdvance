import React, { Component } from 'react';
import {
  Link, withRouter
} from 'react-router-dom';
import { Menu, Icon } from 'antd';

import GbaIcon from './game-boy-advance.svg';

class Header extends Component
{
  constructor(props)
  {
    super(props);

    // Don't call this.setState() here!
    this.state = {
    };
  }

  render()
  {
    return (
      <Menu
        theme="dark"
        selectedKeys={[this.props.location.pathname]}
        mode="horizontal"
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
    );
  }
}

export default withRouter(Header);

