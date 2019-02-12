import React from 'react';
import {
  Layout,
  Spin
} from 'antd';
import BodyScrollUnAble from './BodyScrollUnAble';

class LoadingMessage extends React.Component
{
  render()
  {
    const imgWidth = 100;
    return (
      <Layout style={{ position: 'relative', height: '100vh', backgroundColor: 'transparent', textAlign: 'center' }}>
        <BodyScrollUnAble>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '50%',
              left: 0,
              marginTop: '-' + ((imgWidth + 10 + 22)/2) + 'px'
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <img
                src="favicon.ico"
                alt="Splash logo"
                style={{ maxWidth: imgWidth + 'px', }}
              />
            </div>
            <div className="ant-tag" style={{ marginRight: 0 }}>
              GameBoy Advance
            </div>
          </div>
          <div style={{ position: 'absolute', width: '100%', bottom: '100px', left: 0 }}>
            <Spin />
          </div>
        </BodyScrollUnAble>
      </Layout>
    );
  }
}

function withSplashScreen(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
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

