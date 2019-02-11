import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

class Footer extends Component
{
  render()
  {
    if (this.props.location.pathname === '/play')
    {
      return false;
    }

    return (
      <Layout.Footer>
      </Layout.Footer>
    );
  }
}

export default withRouter(Footer);

