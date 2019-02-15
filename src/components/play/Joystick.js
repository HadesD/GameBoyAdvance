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
    this.emulatorRef = props.parent.emulatorRef;
    this.emulatorManager = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount()
  {
    this.emulatorManager = this.emulatorRef.emulatorManager;

    const current = this.selfRef.current;

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
    // this.emulatorManager.onPressed(key);
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
        <button className="rectangle-btn" data-joykey="L">
          L
        </button>
        <button className="rectangle-btn" data-joykey="R">
          R
        </button>
        <div
          className="console-dpad-btn"
          style={{
            backgroundImage: 'url('+dpadIcon+')',
          }}
        >
          <button className="dpad-btn" data-joykey="LEFT"/>
          <button className="dpad-btn" data-joykey="UP" />
          <button className="dpad-btn" data-joykey="RIGHT" />
          <button className="dpad-btn" data-joykey="DOWN" />
        </div>
        <button className="circle-btn" data-joykey="A">
          A
        </button>
        <button className="circle-btn" data-joykey="B">
          B
        </button>
        <button className="rectangle-btn" data-joykey="START">
          Start
        </button>
        <button className="rectangle-btn" data-joykey="SELECT">
          Select
        </button>
      </div>
    );
  }
}

export default Joystick;

