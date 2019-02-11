import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import emuBKG from '../images/emu-background.svg';
import dpadIcon from '../images/dpad.svg';

import './Play.css';

class Play extends BodyScrollUnAble
{
  render()
  {
    const dPadSize = 100;
    return (
      <div style={{ backgroundImage: 'url('+emuBKG+')', height: 'calc(100vh - 25px)', touchAction: 'manipulation', }} className="noselect">
        <button
          type="button"
          className="console-btn"
          style={{
            backgroundImage: 'url('+dpadIcon+')',
            width: dPadSize + 'px',
            height: dPadSize + 'px',
          }}
        >
        </button>
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

