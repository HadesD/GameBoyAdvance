import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import Emulator from './Emulator';
import Joystick from './Joystick';
import GamepadManager from './GamepadManager';
import KeyboardManager from './KeyboardManager';

import gbaLandscape from '../images/gba-console-landscape.svg';
import emuBKG from '../images/emu-background.svg';

import './Play.css';

class Play extends React.Component
{
  gamePadManager = null;

  constructor(props)
  {
    console.log('Play.constructor called');

    super(props);

    this.selfRef = React.createRef();
    this.joystickRef = React.createRef();
    this.emulatorRef = React.createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    // Use Gamepad
    if (window.getGamepads)
    {
      this.gamePadManager = new GamepadManager(this);
    }
    this.keyboardManager = new KeyboardManager(this);
  }

  componentDidMount()
  {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (this.gamePadManager)
    {
      this.gamePadManager.start();
    }
    this.keyboardManager.start();
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.updateWindowDimensions);

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
      const current = this.selfRef.current;
      if (window.innerWidth > window.innerHeight)
      {
        if (!current.classList.contains('landscape'))
        {
          current.classList.remove('portrait');
          current.classList.add('landscape');
          current.style.backgroundImage = 'url('+gbaLandscape+')';
        }
      }
      else
      {
        if (!current.classList.contains('portrait'))
        {
          current.classList.remove('landscape');
          current.classList.add('portrait');
          current.style.backgroundImage = 'none';
        }
      }
    }), 250);
  }

  render()
  {
    return (
      <BodyScrollUnAble
        style={{
          backgroundImage: 'url('+emuBKG+')',
        }}
      >
        <div
          ref={this.selfRef}
          className="play-wrapper"
        >
          <Emulator
            ref={this.emulatorRef}
            parent={this}
          />
          <Joystick
            ref={this.joystickRef}
            parent={this}
          />
        </div>
      </BodyScrollUnAble>
    );
  }
}

export default Play;

