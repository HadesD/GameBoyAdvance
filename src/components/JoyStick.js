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
  }

  componentDidMount()
  {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
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
    // alert(1);

    this.isPushed = true;

    const target = e.target;
    const key = target.getAttribute('data-joykey');

    console.log('onMouseDown: ' + key);
    // alert('onMouseDown: ' + key);

    this.lastKey = key;
  }

  onMouseMove(e)
  {
    if (this.hasOnTouchMove && (e.type === 'mousemove'))
    {
      return;
    }

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
    let dPadBtnStyle = {};

    if (this.props.isPortrait)
    {
      // Dpad block
      dPadBtnStyle.backgroundImage = 'url('+dpadIcon+')';
    }

    return (
      <div>
        <div
          className="console-dpad-btn"
          style={dPadBtnStyle}
        >
          <button
            className="dpad-btn"
            data-joykey="left"
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchMove={this.onMouseMove}
            onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="up"
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchMove={this.onMouseMove}
            onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="right"
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchMove={this.onMouseMove}
            onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="down"
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchMove={this.onMouseMove}
            onTouchEnd={this.onMouseUp}
          />
        </div>
        <button
          className="circle-btn"
          data-joykey="a"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
        >
          A
        </button>
        <button
          className="circle-btn"
          data-joykey="b"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
          onTouchEnd={this.onMouseUp}
        >
          B
        </button>
      </div>
    );
  }
}

export default JoyStick;

