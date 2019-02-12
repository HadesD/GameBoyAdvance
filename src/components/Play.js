import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import JoyStick from './JoyStick';

import emuBKG from '../images/emu-background.svg';
import emuCanvasBKG from '../images/emu-canvas-bg.svg';

import './Play.css';

class Play extends React.Component
{
  isPortrait = false;

  constructor(props)
  {
    console.log('Play.constructor called');

    super(props);

    this.state = {
      winSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);

    // document.addEventListener('contextmenu', this.onContextMenu);
  }

  componentDidMount()
  {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateWindowDimensions);
    // document.removeEventListener('contextmenu', this.onContextMenu);
  }

  updateWindowDimensions()
  {
    console.log('updateWindowDimensions called');
    this.setState({
      winSize: {
        width: window.innerWidth, height: window.innerHeight
      },
    });
  }

  onContextMenu(e)
  {
    e.preventDefault();
  }

  render()
  {
    const wHeight = this.state.winSize.height;
    const wWidth = this.state.winSize.width;

    let emuWrapWidth = 165;
    let emuWrapHeight = 148;
    const d = emuWrapWidth / emuWrapHeight;

    let emuStyle = {
      backgroundImage: 'url('+emuCanvasBKG+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      padding: '2px',
      position: 'absolute',
      left: '50%',
    };

    if (wHeight < wWidth)
    {
      // Landscape
      this.isPortrait = false;

      emuStyle.height = (wHeight - 25) / d;
      emuStyle.width = emuStyle.height * d
      emuStyle.marginTop = '-' + ((emuStyle.height - 25)/2) + 'px';
      emuStyle.top = '50%';
    }
    else
    {
      // Portrait
      this.isPortrait = true;

      emuStyle.top = '35px';
      emuStyle.width = wWidth / d;
      emuStyle.height = emuStyle.width / d;
    }

    emuStyle.marginLeft = '-' + (emuStyle.width/2) + 'px';

    return (
      <BodyScrollUnAble 
        className="noselect"
        style={{ backgroundImage: 'url('+emuBKG+')', height: 'calc(100vh - 25px)', }}
      >
        <div style={emuStyle}>
          <canvas
            id="emulator"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
          </canvas>
        </div>
        <JoyStick
          isPortrait={this.isPortrait}
        />
      </BodyScrollUnAble>
    );
  }
}

export default Play;

