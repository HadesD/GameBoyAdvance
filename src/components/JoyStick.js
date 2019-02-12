import React from 'react';
import dpadIcon from '../images/dpad.svg';

import './JoyStick.css';

class JoyStick extends React.Component
{
  isPushed = false;
  lastKey = null;
  hasOnTouchStart = ('ontouchstart' in document.documentElement);
  hasOnTouchMove = ('ontouchmove' in document.documentElement);
  hasOnTouchEnd = ('ontouchend' in document.documentElement);

  constructor(props)
  {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
  }

  componentDidMount()
  {
  }

  componentWillUnmount()
  {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onMouseUp);
  }

  onMouseDown(e)
  {
    if (this.hasOnTouchStart && (e.type === 'mousedown'))
    {
      return;
    }

    this.isPushed = true;

    const target = e.target;
    const key = target.getAttribute('data-joykey');

    console.log('onMouseDown: ' + key);
    // alert('onMouseDown: ' + key);

    this.lastKey = key;
  }

  onMouseMove(e)
  {
    if (!this.isPushed)
    {
      return;
    }

    let posX = e.clientX;
    let posY = e.clientY;

    if (this.hasOnTouchMove && (e.type === 'touchmove'))
    {
      e.persist();
      // console.log(e);
      let touchPos = e.changedTouches[0];
      posX = touchPos.clientX;
      posY = touchPos.clientY;
    }

    const target = document.elementFromPoint(posX, posY);
    if (!target)
    {
      return;
    }
    const key = target.getAttribute('data-joykey');
    if (!key || key === this.lastKey)
    {
      return;
    }
    this.lastKey = key;
    console.log('onMouseMove: ' + key);
    // alert('onMouseMove: ' + key);
  }

  onMouseUp(e)
  {
    if (this.hasOnTouchEnd && (e.type === 'mouseup'))
    {
      return;
    }

    // If all key released
    if (!this.isPushed)
    {
      return;
    }

    this.isPushed = false;
    this.lastKey = null;

    const target = e.target;
    const key = target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }
    console.log('onMouseUp: ' + key);
    // alert('onMouseUp: ' + key);
  }

  render()
  {
    const dPadSize = 100;
    const dPadArrowSize = 100 / 3;
    return (
      <div
        className="console-dpad-btn"
        style={{
          backgroundImage: 'url('+dpadIcon+')',
          width: dPadSize + 'px',
          height: dPadSize + 'px',
          position: 'absolute',
          top: '50%',
          left: '0',
          marginTop: '-' + ((dPadSize - 25)/2) + 'px',
          marginLeft: '10px',
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
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
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
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
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
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
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
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
        >
        </button>
      </div>
    );
  }
}

export default JoyStick;

