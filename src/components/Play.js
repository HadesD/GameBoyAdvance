import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

import emuBKG from './emu-background.svg';

class Play extends BodyScrollUnAble
{
  render()
  {
    return (
      <div style={{ backgroundImage: 'url('+emuBKG+')', height: '100vh' }}>
        <canvas id="emulator-control"></canvas>
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

