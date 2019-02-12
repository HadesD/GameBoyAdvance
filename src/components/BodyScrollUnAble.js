import React from 'react';
import { disableBodyScroll/* , enableBodyScroll */, clearAllBodyScrollLocks } from 'body-scroll-lock';

class BodyScrollUnAble extends React.Component
{
  lastTouchEnd = 0;

  constructor(props)
  {
    super(props);

    // this.touchstartHandle.bind(this);
    // this.touchendHandle.bind(this);
    // this.touchmoveHandle.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  componentDidMount()
  {
    // document.addEventListener('touchstart', this.touchstartHandle, true);
    // document.addEventListener('touchmove', this.touchmoveHandle, true);
    // document.addEventListener('touchend', this.touchendHandle, true);

    window.scrollTo(0, 0);
    disableBodyScroll(document.querySelector('#root'));

    document.addEventListener('contextmenu', this.onContextMenu);
  }

  componentWillUnmount() {
    // document.removeEventListener('touchstart', this.touchstartHandle, true);
    // document.removeEventListener('touchmove', this.touchmoveHandle, true);
    // document.removeEventListener('touchend', this.touchendHandle, true);
    document.removeEventListener('contextmenu', this.onContextMenu);

    clearAllBodyScrollLocks();
  }

  touchstartHandle(event)
  {
    if (event.touches.length > 1)
    {
      event.preventDefault();
    }
  }

  touchmoveHandle(event)
  {
    if (event.scale !== 1) { event.preventDefault(); }
  }

  // touchendHandle(event)
  // {
  //   var now = window.performance.now();
  //   if ((now - this.lastTouchEnd) <= 500) {
  //     event.preventDefault();
  //   }
  //   this.lastTouchEnd = now;
  // }

  onContextMenu(e)
  {
    e.preventDefault();
  }

  render()
  {
    const className = [
      'noselect',
      this.props.className ? this.props.className : false
    ].join(' ');
    return (
      <div
        className={className}
        style={this.props.style ? this.props.style : {}}
      >
        {this.props.children}
      </div>
    );
  }
}

export default BodyScrollUnAble;

