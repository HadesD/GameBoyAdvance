import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import Joystick from './Joystick';
import GamepadManager from './GamepadManager';
import KeyboardManager from './KeyboardManager';

import emuLandscape from '../images/gba-console-landscape.svg';
import emuBKG from '../images/emu-background.svg';
import emuCanvasBKG from '../images/emu-canvas-bg.svg';

import GameBoy from '../libs/amebo';

import './Play.css';

class Play extends React.Component
{
  isPortrait = false;
  gamePadManager = null;

  constructor(props)
  {
    console.log('Play.constructor called');

    super(props);

    this.selfRef = React.createRef();
    this.joystickRef = React.createRef();
    this.emuDisplayRef = React.createRef();

    this.state = {
      winSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);

    this.emu = null;

    // Use Gamepad
    if (window.getGamepads)
    {
      this.gamePadManager = new GamepadManager(this);
    }
    this.keyboardManager = new KeyboardManager(this);
  }

  componentDidMount()
  {
    window.addEventListener('resize', this.updateWindowDimensions);
    // window.addEventListener('orientationchange', this.updateWindowDimensions);
    if (this.gamePadManager)
    {
      this.gamePadManager.start();
    }
    this.keyboardManager.start();

    this.emu = new GameBoy('', this.emuDisplayRef.current);
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateWindowDimensions);
    // window.removeEventListener('orientationchange', this.updateWindowDimensions);

    if (this.gamePadManager)
    {
      this.gamePadManager.destroy();
    }
    this.keyboardManager.destroy();
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

  onDrop(e)
  {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file)
    {
      return;
    }

    let emu = this.emu;

    let reader = new FileReader();
    reader.onload = function(e) {
      // let arrayBuffer = e.result;
      console.log(e.target.result);
      emu.loadROMBuffer(e.target.result);
      // let array = new Uint8Array(arrayBuffer);
        // binaryString = String.fromCharCode.apply(null, array);

      // console.log(binaryString);
    }
    console.log(file);
    reader.readAsArrayBuffer(file);
  }

  onDragOver(e)
  {
    e.preventDefault();
    // console.log(e);
  }

  render()
  {
    const wHeight = this.state.winSize.height;
    const wWidth = this.state.winSize.width;

    let emuStyle = {};

    let emuSvg = emuBKG;
    let wrapperStyle = {};

    let wrapperClasses = [
      'play-wrapper'
    ];
    let screenTypeClass = 'landscape';

    if (wHeight > wWidth)
    {
      // Portrait
      this.isPortrait = true;
      screenTypeClass = 'portrait';

      emuSvg = emuBKG;

      emuStyle.backgroundImage = 'url('+emuCanvasBKG+')';
    }
    else
    {
      // Landscape
      this.isPortrait = false;
      emuSvg = emuLandscape;

      emuStyle.backgroundImage = 'url('+emuCanvasBKG+')'; // Debug
    }
    wrapperClasses.push(screenTypeClass);

    wrapperStyle.backgroundImage = 'url('+emuSvg+')';

    return (
      <BodyScrollUnAble
        ref={this.selfRef}
        className={wrapperClasses.join(' ')}
        style={wrapperStyle}
      >
        <div className="emu-wrapper" style={emuStyle}>
          <canvas ref={this.emuDisplayRef} onDrop={this.onDrop} onDragOver={this.onDragOver} />
        </div>
        <Joystick
          ref={this.joystickRef}
          parent={this}
          isPortrait={this.isPortrait}
          winSize={this.state.winSize}
        />
      </BodyScrollUnAble>
    );
  }
}

export default Play;

