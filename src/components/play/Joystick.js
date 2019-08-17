import React from 'react';
import dpadIcon from '../../images/dpad.svg';

//import './Joystick.css';

class Joystick extends React.Component
{
  isPushed = false;

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
    this.emulatorManager = this.emulatorRef.current.emulatorManager;

    const current = this.selfRef.current;

    // Mouse
    if (this.hasSupportTouch)
    {
      // window.addEventListener('touchstart', this.onMouseDown);
      // window.addEventListener('touchend', this.onMouseUp);

      current.addEventListener('touchstart', this.onMouseDown);
      current.addEventListener('touchmove', this.onMouseMove);
      current.addEventListener('touchend', this.onMouseUp);
    }
    else
    {
      // window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mouseup', this.onMouseUp);

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
    // current.removeEventListener('touchcancel', this.onMouseUp);

    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchstart', this.onMouseDown);
    window.removeEventListener('touchend', this.onMouseUp);
  }

  onMouseDown(e)
  {
    console.log('%s', e.type, e);

    const target = e.target;
    const key = target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }

    e.preventDefault();
    this.isPushed = true;

    if (this.emulatorManager.isKeyPressed(key))
    {
      return;
    }

    this.emulatorManager.onPressed(key);
  }

  onMouseMove(e)
  {
    console.log('%s', e.type);
    if (!this.isPushed)
    {
      return;
    }

    e.preventDefault();

    let posX = e.clientX;
    let posY = e.clientY;

    if (e.type === 'touchmove')
    {
      // e.persist();
      const touches = e.touches;

      let touchedKeyList = [];
      for (let i = 0; i < touches.length; i++)
      {
        const touch = touches[i];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!target)
        {
          continue;
        }
        const key = target.getAttribute('data-joykey');
        if (!key || (key in touchedKeyList))
        {
          continue;
        }
        touchedKeyList.push(key);
        // alert('pushed:' + key);
      }

      const pressedKeyList = this.emulatorManager.keyCodes;
      const keys = Object.keys(pressedKeyList);
      for (let i = 0; i < keys.length; i++)
      {
        const key = keys[i];
        if (key in touchedKeyList)
        {
          continue;
        }
        if (!this.emulatorManager.isKeyPressed(key))
        {
          continue;
        }
        this.emulatorManager.onReleased(key);
        // alert(key);
      }

      const changedTouches = e.changedTouches;
      const touchPos = changedTouches[0];
      posX = touchPos.clientX;
      posY = touchPos.clientY;
    }

    const target = document.elementFromPoint(posX, posY);
    if (!target)
    {
      return;
    }
    const key = target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }
    if (this.emulatorManager.isKeyPressed(key))
    {
      return;
    }
    this.emulatorManager.onPressed(key);
  }

  onMouseUp(e)
  {
    console.log('%s', e.type, e);

    // If all key released
    if (!this.isPushed)
    {
      return;
    }

    this.isPushed = false;

    // Because of one mouse only, so we release all
    if (e.type === 'mouseup')
    {
      this.emulatorManager.releaseAllKey();
      return;
    }
    else if (e.type === 'touchend')
    {
      if (e.touches.length <= 1)
      {
        this.emulatorManager.releaseAllKey();
        return;
      }
    }

    const target = e.target;
    const key = target.getAttribute('data-joykey');
    if (!key)
    {
      return;
    }
    this.emulatorManager.onReleased(key);
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

