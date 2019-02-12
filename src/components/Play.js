import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import JoyStick from './JoyStick';

import emuBKG from '../images/emu-background.svg';
import emuCanvasBKG from '../images/emu-canvas-bg.svg';

import './Play.css';

class Play extends BodyScrollUnAble
{
  isPortrait = false;

  constructor(props)
  {
    console.log('Play.constructor called');

    super(props);

    this.state = {
      winSize: {
        width: 0,
        height: 0,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);

    document.addEventListener('contextmenu', this.onContextMenu);
  }

  componentDidMount()
  {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateWindowDimensions);
    document.removeEventListener('contextmenu', this.onContextMenu);
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
    const emuWrapWidth = 165;
    const emuWrapHeight = 148;

    return (
      <div style={{ backgroundImage: 'url('+emuBKG+')', height: 'calc(100vh - 25px)', touchAction: 'manipulation', }} className="noselect">
        <div
          style={{
            backgroundImage: 'url('+emuCanvasBKG+')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            padding: '2px',
            width: emuWrapWidth + 'px',
            height: emuWrapHeight + 'px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-' + ((emuWrapHeight - 25)/2) + 'px',
            marginLeft: '-' + (emuWrapWidth/2) + 'px',
          }}
        >
          <canvas
            id="emulator"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
          </canvas>
        </div>
        <JoyStick />
      </div>
    );
  }
}

export default Play;

