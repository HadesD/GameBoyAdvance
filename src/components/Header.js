import React, { Component } from 'react';
import {
  Link, withRouter
} from 'react-router-dom';
import { Menu, Icon } from 'antd';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class _Header extends Component
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
      </Menu>
    );
  }
}

const Header = withRouter(_Header);

export default Header;

