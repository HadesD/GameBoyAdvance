import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import DPad from './DPad';

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
        <DPad
        />
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

