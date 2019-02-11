import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import JoyStick from './JoyStick';

import emuBKG from '../images/emu-background.svg';

import './Play.css';

class Play extends BodyScrollUnAble
{
  constructor(props)
  {
    super(props);

    console.log('Play.constructor called');
  }

  render()
  {
    return (
      <div style={{ backgroundImage: 'url('+emuBKG+')', height: 'calc(100vh - 25px)', touchAction: 'manipulation', }} className="noselect">
        <JoyStick />
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

