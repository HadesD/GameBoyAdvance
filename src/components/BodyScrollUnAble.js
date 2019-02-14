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
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount()
  {
    // document.addEventListener('touchstart', this.touchstartHandle, true);
    // document.addEventListener('touchmove', this.touchmoveHandle, true);
    // document.addEventListener('touchend', this.touchendHandle, true);

    window.scrollTo(0, 0);
    disableBodyScroll(document.querySelector('#root'));

    document.addEventListener('contextmenu', this.onContextMenu);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    // document.removeEventListener('touchstart', this.touchstartHandle, true);
    // document.removeEventListener('touchmove', this.touchmoveHandle, true);
    // document.removeEventListener('touchend', this.touchendHandle, true);
    document.removeEventListener('contextmenu', this.onContextMenu);
    window.removeEventListener('scroll', this.onScroll);

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

  onScroll(e)
  {
    // e.preventDefault();
    window.scrollTo(0, 0);
  }

  render()
  {
    const className = [
      'noselect',
      this.props.className ? this.props.className : ''
    ].join(' ');
    return (
      <div
        ref={this.props.ref ? this.props.ref : false}
        className={className}
        style={this.props.style ? this.props.style : {}}
      >
        {this.props.children}
      </div>
    );
  }
}

export default BodyScrollUnAble;

