import React from 'react';
import dpadIcon from '../images/dpad.svg';

import './JoyStick.css';

class JoyStick extends React.Component
{
  isPushed = false;
  lastKey = null;

  constructor(props)
  {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    document.addEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseDown(e)
  {
    if ('ontouchend' in document.documentElement)
    {
      return;
    }

    this.isPushed = true;

    // console.log(this.onMouseDown.name, e);
    const key = e.target.getAttribute('data-joykey');
    console.log(key);

    this.lastKey = key;
    // alert(key);
  }

  onMouseMove(e)
  {
    if (!this.isPushed)
    {
      return;
    }
    const key = e.target.getAttribute('data-joykey');
    if (!key || key === this.lastKey)
    {
      return;
    }
    this.lastKey = key;
    console.log(key);
  }

  onMouseUp(e)
  {
    if ('ontouchstart' in document.documentElement)
    {
      return;
    }

    this.isPushed = false;
    this.lastKey = null;

    // console.log(this.onMouseUp.name, e);
    const key = e.target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }
    console.log(key);

    // alert(key);
  }

  onTouchStart(e)
  {
    this.isPushed = true;

    const key = e.target.getAttribute('data-joykey');
    this.lastKey = key;
    console.log(key);
    alert(key);
  }

  // If player keep push then move the hand
  onTouchMove(e)
  {
    if (!this.isPushed)
    {
      return;
    }

    const key = e.target.getAttribute('data-joykey');
    this.lastKey = key;
    console.log(key);
  }

  onTouchEnd(e)
  {
    this.isPushed = false;
    this.lastKey = null;

    const key = e.target.getAttribute('data-joykey');
    console.log(key);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp, true);
  }

  render()
  {
    const dPadSize = 100;
    const dPadArrowSize = 100 / 3;
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
          data-joykey="left"
          style={{
            top: '50%',
            width: (dPadArrowSize * 1.5) + '%',
            height: dPadArrowSize + '%',
            left: 0,
            marginTop: (dPadArrowSize / -2) + '%',
            borderRadius: `5px ${dPadArrowSize}px ${dPadArrowSize}px 5px`,
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
        </button>
        <button
          className="dpad-btn"
          data-joykey="up"
          style={{
            top: 0,
            width: dPadArrowSize + '%',
            height: (dPadArrowSize * 1.5) + '%',
            left: '50%',
            marginLeft: (dPadArrowSize / -2) + '%',
            borderRadius: `5px 5px ${dPadArrowSize}px ${dPadArrowSize}px`,
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
        </button>
        <button
          className="dpad-btn"
          data-joykey="right"
          style={{
            top: '50%',
            width: (dPadArrowSize * 1.5) + '%',
            height: dPadArrowSize + '%',
            right: 0,
            marginTop: (dPadArrowSize / -2) + '%',
            borderRadius: `${dPadArrowSize}px 5px 5px ${dPadArrowSize}px`,
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
        </button>
        <button
          className="dpad-btn"
          data-joykey="down"
          style={{
            top: dPadSize / 2,
            left: '50%',
            width: dPadArrowSize + '%',
            height: (dPadArrowSize * 1.5) + '%',
            marginLeft: (dPadArrowSize / -2) + '%',
            borderRadius: `${dPadArrowSize}px ${dPadArrowSize}px 5px 5px`,
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
        </button>
      </div>
    );
  }
}

export default JoyStick;

