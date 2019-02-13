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
    const wWidth = this.props.winSize.width;
    const wHeight = this.props.winSize.height;

    const dWH = wWidth / wHeight;

    let dPadSize = 100.0;
    const dPadArrowSize = 100.0 / 3;

    let dPadBtnStyle = {
      backgroundImage: 'url('+dpadIcon+')',
    };

    if (this.props.isPortrait)
    {
      dPadSize = wWidth / 2 / 1.5;
      dPadBtnStyle.bottom = (100 / 3) / 2 + '%';
      dPadBtnStyle.marginTop = '-' + ((dPadSize - 25)/2) + 'px';
    }
    else
    {
      dPadSize = wWidth / 7.43;
      // dPadBtnStyle.backgroundImage = 'none';
      dPadBtnStyle.top = dWH + '%';
      // dPadBtnStyle.marginTop = '-';
      dPadBtnStyle.left = '4.9%';
      // dPadBtnStyle.marginLeft = '-' + ((dPadSize - 25)/2) + 'px';
    }
    const dPadArrowBR = dPadSize / 9.9; // BorderRadius Size

    dPadBtnStyle.width = dPadSize + 'px';
    dPadBtnStyle.height = dPadSize + 'px';

    return (
      <div>
        <div
          className="console-dpad-btn"
          style={dPadBtnStyle}
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
              borderRadius: `${dPadArrowBR}px ${dPadArrowSize}px ${dPadArrowSize}px ${dPadArrowBR}px`,
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
              borderRadius: `${dPadArrowBR}px ${dPadArrowBR}px ${dPadArrowSize}px ${dPadArrowSize}px`,
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
              borderRadius: `${dPadArrowSize}px ${dPadArrowBR}px ${dPadArrowBR}px ${dPadArrowSize}px`,
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
              borderRadius: `${dPadArrowSize}px ${dPadArrowSize}px ${dPadArrowBR}px ${dPadArrowBR}px`,
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
      </div>
    );
  }
}

export default JoyStick;

