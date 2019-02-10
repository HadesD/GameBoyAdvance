import React, {Component} from 'react';
import {
  Layout,
  Spin
} from 'antd';

class LoadingMessage extends Component
{
  render()
  {
    const imgWidth = 100;
    return (
      <Layout style={{ height: '100vh', backgroundColor: 'transparent', textAlign: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', top: '50%', left: 0, marginTop: '-' + (imgWidth/2) + 'px' }}>
          <img
            src="favicon.ico"
            alt="Splash logo"
            style={{ maxWidth: imgWidth + 'px', }}
          />
          <br />
          <br />
          <div className="ant-tag" style={{ marginRight: 0 }}>
            GameBoy Advance
          </div>
        </div>
        <div style={{ position: 'absolute', width: '100%', top: '90vh', left: 0 }}>
          <Spin />
        </div>
      </Layout>
    );
  }
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        // await auth0Client.loadSession();
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      if (this.state.loading)
      {
        return (
          <LoadingMessage />
        );
      }

      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}

export default withSplashScreen;

