import React from 'react';
import BodyScrollUnAble from './BodyScrollUnAble';

class Play extends BodyScrollUnAble
{
  render()
  {
    return (
      <div>
        <canvas id="emulator"></canvas>
      </div>
    );
  }
}

export default Play;

