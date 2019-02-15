import React from 'react';
import dpadIcon from '../../images/dpad.svg';

import './Joystick.css';

class Joystick extends React.Component
{
  isPushed = false;
  lastKey = null;

  hasSupportTouch = ('ontouchstart' in document.documentElement);

  constructor(props)
  {
    super(props);

    this.selfRef = React.createRef();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount()
  {
    const current = this.selfRef.current;
    // console.log(current);

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
  }

  componentWillUnmount()
  {
    const current = this.selfRef.current;

    current.removeEventListener('mousedown', this.onMouseDown);
    current.removeEventListener('mousemove', this.onMouseMove);
    current.removeEventListener('mouseup', this.onMouseUp);

    current.removeEventListener('touchstart', this.onMouseDown);
    current.removeEventListener('touchmove', this.onMouseMove);
    current.removeEventListener('touchend', this.onMouseUp);
  }

  onMouseDown(e)
  {
    // console.log('%s', e.type);
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
    // console.log('%s', e.type);
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

  setActive(joykey, isActive)
  {
    const current = this.selfRef.current;
    const btns = current.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++)
    {
      const btn = btns[i];
      if (!btn || btn.getAttribute('data-joykey') !== joykey)
      {
        continue;
      }
      console.log(btn, isActive);
      if (isActive)
      {
        btn.classList.add('active');
      }
      else
      {
        btn.classList.remove('active');
      }
    }
  }

  render()
  {
    return (
      <div ref={this.selfRef} className="joystick">
        <div
          className="console-dpad-btn"
          style={{
            backgroundImage: 'url('+dpadIcon+')',
          }}
        >
          <button className="dpad-btn" data-joykey="left"/>
          <button className="dpad-btn" data-joykey="up" />
          <button className="dpad-btn" data-joykey="right" />
          <button className="dpad-btn" data-joykey="down" />
        </div>
        <button className="circle-btn" data-joykey="a">
          A
        </button>
        <button className="circle-btn" data-joykey="b">
          B
        </button>
      </div>
    );
  }
}

export default Joystick;

