import React from 'react';
import { disableBodyScroll/* , enableBodyScroll */, clearAllBodyScrollLocks } from 'body-scroll-lock';

class BodyScrollUnAble extends React.Component
{
  componentDidMount()
  {
    window.scrollTo(0, 0);
    disableBodyScroll(document.querySelector('#root'));
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }
}

export default BodyScrollUnAble;

