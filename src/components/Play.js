import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import JoyStick from './JoyStick';
import GamepadManager from './GamepadManager';

import emuLandscape from '../images/gba-console-landscape.svg';
import emuBKG from '../images/emu-background.svg';
import emuCanvasBKG from '../images/emu-canvas-bg.svg';

import './Play.css';

class Play extends React.Component
{
  isPortrait = false;
  gamePadManager = null;

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

    // Use Gamepad
    if (window.getGamepads)
    {
      this.gamePadManager = new GamepadManager();
    }
  }

  componentDidMount()
  {
    window.addEventListener('resize', this.updateWindowDimensions);
    // window.addEventListener('orientationchange', this.updateWindowDimensions);
    if (this.gamePadManager)
    {
      this.gamePadManager.start();
    }
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateWindowDimensions);
    // window.removeEventListener('orientationchange', this.updateWindowDimensions);

    if (this.gamePadManager)
    {
      this.gamePadManager.destroy();
    }
  }

  updateWindowDimensions()
  {
    console.log('updateWindowDimensions called');
    let timeOut = setTimeout((() => {
      clearTimeout(timeOut);
      this.setState({
        winSize: {
          width: window.innerWidth, height: window.innerHeight
        },
      });
    }), 250);
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
    };

    let emuSvg = emuBKG;
    let wrapperStyle = {
      height: 'calc(100vh - 25px)',
    }

    if (wHeight > wWidth)
    {
      // Portrait
      this.isPortrait = true;

      emuSvg = emuBKG;
      wrapperStyle.backgroundSize = 'cover';
      wrapperStyle.backgroundColor = 'transparent';
      wrapperStyle.backgroundRepeat = 'repeat';

      emuStyle.top = '35px';
      emuStyle.width = wWidth / d;
      emuStyle.height = emuStyle.width / d;
    }
    else
    {
      // Landscape
      this.isPortrait = false;
      emuSvg = emuLandscape;
      wrapperStyle.backgroundColor = '#36393f';
      wrapperStyle.backgroundSize = '105%';
      wrapperStyle.backgroundPosition = 'center';
      wrapperStyle.backgroundRepeat = 'no-repeat';

      emuStyle.height = (wHeight - 25) / d;
      emuStyle.width = emuStyle.height * d
      emuStyle.marginTop = '-' + ((emuStyle.height - 25)/2) + 'px';
      emuStyle.top = '50%';
    }

    wrapperStyle.backgroundImage = 'url('+emuSvg+')';

    emuStyle.marginLeft = '-' + (emuStyle.width/2) + 'px';

    return (
      <BodyScrollUnAble
        style={wrapperStyle}
      >
        <div className="emuWrapper" style={emuStyle}>
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
          winSize={this.state.winSize}
        />
      </BodyScrollUnAble>
    );
  }
}

export default Play;

