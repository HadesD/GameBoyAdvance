import React from 'react';
import dpadIcon from '../images/dpad.svg';

import './JoyStick.css';

class JoyStick extends React.Component
{
  isPushed = false;
  lastKey = null;

  ref = null;

  hasSupportTouch = ('ontouchstart' in document.documentElement);

  constructor(props)
  {
    super(props);

    this.ref = React.createRef();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount()
  {
    const current = this.ref.current;
    console.log(current);

    // Mouse
    if (this.hasSupportTouch)
    {
      current.addEventListener('touchstart', this.onMouseDown);
      current.addEventListener('touchmove', this.onMouseMove);
      current.addEventListener('touchend', this.onMouseUp);
    }
    else
    {
      current.addEventListener('mousedown', this.onMouseDown);
      current.addEventListener('mousemove', this.onMouseMove);
      current.addEventListener('mouseup', this.onMouseUp);
    }

    // window.addEventListener('touchstart', function onFirstHover() {
    //   current.removeEventListener('mousedown', this.onMouseDown);
    //   current.removeEventListener('mousemove', this.onMouseMove);
    //   current.removeEventListener('mouseup', this.onMouseUp);
    //   window.removeEventListener('touchstart', onFirstHover, false);
    // }, false);
  }

  componentWillUnmount()
  {
    const current = this.ref.current;

    current.removeEventListener('mousedown', this.onMouseDown);
    current.removeEventListener('mousemove', this.onMouseMove);
    current.removeEventListener('mouseup', this.onMouseUp);

    current.removeEventListener('touchstart', this.onMouseDown);
    current.removeEventListener('touchmove', this.onMouseMove);
    current.removeEventListener('touchend', this.onMouseUp);
  }

  onMouseDown(e)
  {
    console.log('%s', e.type);
    this.isPushed = true;

    const target = e.target;
    const key = target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }

    console.log('%s: %s', e.type, key);
    // alert('onMouseDown: ' + key);

    this.lastKey = key;
  }

  onMouseMove(e)
  {
    console.log('%s', e.type);
    if (!this.isPushed)
    {
      return;
    }

    let posX = e.clientX;
    let posY = e.clientY;

    if (e.type === 'touchmove')
    {
      // e.persist();
      const touchPos = e.changedTouches[0];
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
    console.log('%s: %s', e.type, key);
    // alert('onMouseMove: ' + key);
  }

  onMouseUp(e)
  {
    console.log('%s', e.type);
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

    console.log('%s: %s', e.type, key);
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
      <div ref={this.ref}>
        <div
          className="console-dpad-btn"
          style={dPadBtnStyle}
        >
          <button
            className="dpad-btn"
            data-joykey="left"
            // onMouseDown={this.onMouseDown}
            // onMouseMove={this.onMouseMove}
            // onMouseUp={this.onMouseUp}
            // onTouchStart={this.onMouseDown}
            // onTouchMove={this.onMouseMove}
            // onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="up"
            // onMouseDown={this.onMouseDown}
            // onMouseMove={this.onMouseMove}
            // onMouseUp={this.onMouseUp}
            // onTouchStart={this.onMouseDown}
            // onTouchMove={this.onMouseMove}
            // onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="right"
            // onMouseDown={this.onMouseDown}
            // onMouseMove={this.onMouseMove}
            // onMouseUp={this.onMouseUp}
            // onTouchStart={this.onMouseDown}
            // onTouchMove={this.onMouseMove}
            // onTouchEnd={this.onMouseUp}
          />
          <button
            className="dpad-btn"
            data-joykey="down"
            // onMouseDown={this.onMouseDown}
            // onMouseMove={this.onMouseMove}
            // onMouseUp={this.onMouseUp}
            // onTouchStart={this.onMouseDown}
            // onTouchMove={this.onMouseMove}
            // onTouchEnd={this.onMouseUp}
          />
        </div>
        <button
          className="circle-btn"
          data-joykey="a"
          // onMouseDown={this.onMouseDown}
          // onMouseMove={this.onMouseMove}
          // onMouseUp={this.onMouseUp}
          // onTouchStart={this.onMouseDown}
          // onTouchMove={this.onMouseMove}
          // onTouchEnd={this.onMouseUp}
        >
          A
        </button>
        <button
          className="circle-btn"
          data-joykey="b"
          // onMouseDown={this.onMouseDown}
          // onMouseMove={this.onMouseMove}
          // onMouseUp={this.onMouseUp}
          // onTouchStart={this.onMouseDown}
          // onTouchMove={this.onMouseMove}
          // onTouchEnd={this.onMouseUp}
        >
          B
        </button>
      </div>
    );
  }
}

export default JoyStick;

