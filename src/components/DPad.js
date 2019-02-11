import React from 'react';
import dpadIcon from '../images/dpad.svg';

import './DPad.css';

class DPad extends React.Component
{
  onDpadClick(e)
  {
    console.log(this.onDpadClick.name, e);
  }

  render()
  {
    const dPadSize = 100;
    const dPadArrowSize = 100 / 3 - 1;
    return (
        <div
          className="console-btn"
          style={{
            backgroundImage: 'url('+dpadIcon+')',
            width: dPadSize + 'px',
            height: dPadSize + 'px',
            position: 'relative',
          }}
        >
          <button
            className="dpad-btn"
            style={{
              top: '50%',
              width: (dPadArrowSize * 1.5) + '%',
              height: dPadArrowSize + '%',
              left: 0,
              marginTop: (dPadArrowSize / -2) + '%',
              borderRadius: `5px ${dPadArrowSize}px ${dPadArrowSize}px 5px`,
            }}
            onClick={this.onDpadClick.bind(this)}
          >
          </button>
          <button
            className="dpad-btn"
            style={{
              top: 0,
              width: dPadArrowSize + '%',
              height: (dPadArrowSize * 1.5) + '%',
              left: '50%',
              marginLeft: (dPadArrowSize / -2) + '%',
              borderRadius: `5px 5px ${dPadArrowSize}px ${dPadArrowSize}px`,
            }}
            onClick={this.onDpadClick.bind(this)}
          >
          </button>
          <button
            className="dpad-btn"
            style={{
              top: '50%',
              width: (dPadArrowSize * 1.5) + '%',
              height: dPadArrowSize + '%',
              right: 0,
              marginTop: (dPadArrowSize / -2) + '%',
              borderRadius: `${dPadArrowSize}px 5px 5px ${dPadArrowSize}px`,
            }}
            onClick={this.onDpadClick.bind(this)}
          >
          </button>
          <button
            className="dpad-btn"
            style={{
              top: dPadSize / 2,
              left: '50%',
              width: dPadArrowSize + '%',
              height: (dPadArrowSize * 1.5) + '%',
              marginLeft: (dPadArrowSize / -2) + '%',
              borderRadius: `${dPadArrowSize}px ${dPadArrowSize}px 5px 5px`,
            }}
            onClick={this.onDpadClick.bind(this)}
          >
          </button>
        </div>
    );
  }
}

export default DPad;

