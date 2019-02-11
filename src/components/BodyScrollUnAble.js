import React from 'react';
import { disableBodyScroll/* , enableBodyScroll */, clearAllBodyScrollLocks } from 'body-scroll-lock';

class BodyScrollUnAble extends React.Component
{
  root = document.querySelector('#root');

  componentDidMount()
  {
    window.scrollTo(0, 0);
    disableBodyScroll(this.root);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }
}

export default BodyScrollUnAble;

