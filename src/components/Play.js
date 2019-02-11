import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import emuBKG from '../images/emu-background.svg';
import dpadIcon from '../images/dpad.svg';

class Play extends BodyScrollUnAble
{
  render()
  {
    const dPadSize = 100;
    return (
      <div style={{ backgroundImage: 'url('+emuBKG+')', height: 'calc(100vh - 25px)', touchAction: 'manipulation', }}>
        <button
          type="button"
          style={{
            backgroundImage: 'url('+dpadIcon+')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            width: dPadSize + 'px',
            height: dPadSize + 'px',
            border: 'none',
            outline: 'none',
          }}
        >
        </button>
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

